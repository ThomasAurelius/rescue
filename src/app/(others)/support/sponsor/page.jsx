"use client";
import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Renders errors or successful transactions on the screen.
const Message = ({ content }) => {
	return <p dangerouslySetInnerHTML={{ __html: content }} />;
};

const PayPalSubscription = () => {
	const initialOptions = {
		"client-id":
			"AUVT9_bNAKwooWUhPxlnStN9kH-GBfDjK9qRwIo652vElJdf1PpBFPRwbJIqBHZn2uF1-b08og9M386y",
		"enable-funding": "card",
		"disable-funding": "paylater",
		"data-sdk-integration-source": "integrationbuilder_sc",
		vault: "true",
		intent: "subscription",
	};

	const [message, setMessage] = useState("");

	return (
		<div className="App">
			<PayPalScriptProvider options={initialOptions}>
				<PayPalButtons
					style={{
						shape: "rect",
						layout: "vertical",
					}}
					createSubscription={async () => {
						try {
							const response = await fetch(
								"/api/paypal/create-subscription",
								{
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify({
										userAction: "SUBSCRIBE_NOW",
									}),
								}
							);
							const data = await response.json();
							if (data?.id) {
								setMessage(`Successful subscription...`);
								return data.id;
							} else {
								console.error(
									{
										callback: "createSubscription",
										serverResponse: data,
									},
									JSON.stringify(data, null, 2)
								);
								// (Optional) Hides the button container and shows a message about why checkout can't be initiated
								const errorDetail = data?.details?.[0];
								setMessage(
									`Could not initiate PayPal Subscription...<br><br>${
										errorDetail?.issue || ""
									} ${
										errorDetail?.description || data?.message || ""
									} ` + (data?.debug_id ? `(${data.debug_id})` : "")
								);
							}
						} catch (error) {
							console.error(error);
							setMessage(
								`Could not initiate PayPal Subscription...${error}`
							);
						}
					}}
					onApprove={async (data, actions) => {
						/*
              No need to activate manually since SUBSCRIBE_NOW is being used.
              Learn how to handle other user actions from our docs:
              https://developer.paypal.com/docs/api/subscriptions/v1/#subscriptions_create
            */
						if (data.orderID) {
							setMessage(
								`You have successfully subscribed to the plan. Your subscription id is: ${data.subscriptionID}`
							);
						} else {
							setMessage(
								`Failed to activate the subscription: ${data.subscriptionID}`
							);
						}
					}}
				/>
			</PayPalScriptProvider>
			<Message content={message} />
		</div>
	);
};

export default PayPalSubscription;
