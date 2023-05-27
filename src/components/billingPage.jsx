import React, {useRef, useEffect, useState} from 'react';
import '../assets/css/billingPage.css';
import axios from "axios";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import useGlobalState from "../hooks/useGlobalState";

export default function BillingPage(props) {
    const {user, event, closeModal} = props;
    const totalTicketPrice = event.webPaymentAmount;
    const rzpRef = useRef(null);
    const [orderId, setOrderId] = useState(null);
    const {setEventRegistrationConfirmed} = useGlobalState();


    const addPurchaseDocument = async (eventId, paymentId, orderId, signature) => {
        const client = new ApolloClient({
            uri: process.env.REACT_APP_SERVER_URL + '/graphql',
            headers: {
                Authorization: 'Bearer ' + user.token,
            },
            cache: new InMemoryCache()
        });

        const ADD_PURCHASE_DOCUMENT = gql`
            mutation AddPurchaseDocument($eventId: String!, $paymentId: String!, $orderId: String!, $signature: String!, $paymentSource: Int!) {
                addPurchaseDocument(eventId: $eventId, razorpayPaymentId: $paymentId, razorpayOrderId: $orderId, razorpaySignature: $signature, paymentSource: $paymentSource) {
                    amount
                }
            }
        `;
        orderId = orderId ?? '';
        signature = signature ?? '';
        const paymentSource = 1;

        try {
            const result = await client.mutate({
                mutation: ADD_PURCHASE_DOCUMENT,
                variables: {
                    eventId,
                    paymentId,
                    orderId,
                    signature,
                    paymentSource
                }
            });
            return result;
        } catch (error) {
            window.alert(error.toString());
        }
    };

    const initiateOrder = async () => {
        const orderReq = {
            amount: totalTicketPrice * 100, // in paise
        };

        try {
            const response = await axios.post(
                process.env.REACT_APP_SERVER_URL + '/razorpay/initiate_order', // Replace with your server URL
                orderReq,
                {
                    headers: {
                        Authorization: 'Bearer ' + user.token,
                    },
                }
            );

            if (response.data && response.data.orderId) {
                await setOrderId(response.data.orderId);
                return true;
            } else {
                throw new Error('Error getting order ID from server');
            }
        } catch (error) {
            window.alert('Error initiating order: ' + error.message);
            return false;
        }
    };

    const joinEvent = async (eventId) => {
        const client = new ApolloClient({
            uri: process.env.REACT_APP_SERVER_URL + '/graphql',
            headers: {
                Authorization: 'Bearer ' + user.token,
            },
            cache: new InMemoryCache()
        });

        const JOIN_EVENT = gql`
            mutation JoinEvent($id: String!) {
              joinEvent(id: $id) {
                _id
                name
              }
            }
        `;

        try {
            const result = await client.mutate({
                mutation: JOIN_EVENT,
                variables: {
                    id: eventId
                }
            });
            return result;
        } catch (error) {
            window.alert(error.toString());
        }
    };


    const onSuccess = async (response) => {
        // Extract useful information from the response object
        const paymentId = response.razorpay_payment_id;
        const orderId = response.razorpay_order_id;
        const signature = response.razorpay_signature;

        // Perform necessary actions, such as updating your database or showing a confirmation message
        // const capturePaymentRequest = {
        //     paymentId: paymentId,
        //     orderId: orderId,
        //     amount: totalTicketPrice * 100, // Assuming the amount is in paise
        // };

        // Send a request to your server to capture the payment and update the database
        // try {
        // Make a POST request to the capture payment API
        // const captureResponse = await axios.post(
        //     process.env.REACT_APP_SERVER_URL + '/razorpay/capture_order',
        //     capturePaymentRequest,
        //     {
        //         headers: {
        //             Authorization: 'Bearer ' + user.token,
        //         },
        //     }
        // );

        // Check the response for success
        // if (captureResponse.data.success) {
        // Payment captured successfully
        await addPurchaseDocument(event._id, paymentId, orderId, signature);
        await joinEvent(event._id);
        setEventRegistrationConfirmed(true);
        window.alert('Event Joined. Check email for confirmation!');
        closeModal();
        // } else {
        //     throw new Error('Error capturing payment');
        // }
        // } catch (error) {
        //     window.alert('Error capturing payment: ' + error.message);
        // }
    };

    const options = {
        key: process.env.REACT_APP_FIREBASE_RAZORPAY, // Add your Razorpay Key ID here
        amount: totalTicketPrice * 100, // converting to paise (1 INR = 100 paise)
        currency: "INR",
        name: "Folks",
        description: "Ticket Purchase",
        image: "https://i.imgur.com/CN4w2qq.png",
        handler: async function (response) {
            // Handle successful payment here (e.g., update database, show a confirmation message)
            await onSuccess(response);
        },
        prefill: {
            name: user.firstName + ' ' + user.lastName,
            email: user.email,
            contact: user.phoneNo
        },
        theme: {
            color: "#F37254"
        },
        modal: {
            ondismiss: function () {
                // Handle payment failure or modal dismissal here (e.g., show an error message)
                window.alert("Payment failed!");
            },
        },
        order_id: orderId,
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
            rzpRef.current = new window.Razorpay(options);
        };
        document.body.appendChild(script);
    }, []);

    const handlePayClick = async () => {
        if (event.isPaid) {
            const orderInitiated = await initiateOrder();
            if (orderInitiated) {
                options.order_id = orderId;

                if (rzpRef.current) {
                    rzpRef.current = new window.Razorpay(options);
                    rzpRef.current.open();
                }
            }
        } else {
            // Join Event Directly
            await joinEvent(event._id);
            window.alert("Event Joined. Check email for confirmation!");
            closeModal();
        }
    };

    return (
        <div className="billingPage">
            <h1>Summary</h1>
            <div className="detailsDispurse"
                 style={{textAlign: 'start', marginBottom: '20px', fontSize: '14px', fontFamily: 'Poppins'}}>
                <div className="head" style={{fontSize: '14px', display: 'inline', fontWeight: '600'}}>Event:</div>
                {event.name}<br></br><br></br>
                <div className="head" style={{fontSize: '14px', display: 'inline', fontWeight: '600'}}>Event Date:</div>
                {event.date}<br></br><br></br>
                <div className="head" style={{fontSize: '14px', display: 'inline', fontWeight: '600'}}>Participant:
                </div>
                {user.firstName + " " + user.lastName}<br></br><br></br>
                <div className="head" style={{fontSize: '14px', display: 'inline', fontWeight: '600'}}>Email:</div>
                {user.email}
            </div>
            <div className="summaryBox">
                <div className="item">
                    <span className="label">Ticket Price:</span>
                    <span className="value">₹{event.isPaid ? event.webPaymentAmount : 0}</span>
                    <div style={{fontSize: '10px', marginBottom: '10px', marginTop: '5px'}}> + payment gateway fees
                    </div>
                </div>
                {/* <div className="item">
                    <span className="label">Total Price:</span>
                    <div style={{fontSize: '10px', marginBottom: '10px'}}>(including platform fees - 2.5%)</div>
                    <div className="totalPrice"><span className="value">₹{event.isPaid ? 1.02 * event.paymentAmount : 0}</span> <div style={{fontSize: '10px', marginBottom: '10px', lineHeight:'25px'}}> + payment gateway fees(2-3%)</div>
                    </div>
                    </div> */}
            </div>
            <button className="payButton" onClick={handlePayClick}>{event.isPaid ? 'Pay Now' : 'Join For Free'}</button>
        </div>
    );
}
