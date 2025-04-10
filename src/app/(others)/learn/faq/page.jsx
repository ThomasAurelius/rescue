"use client";
import { useState } from "react";

const faqs = [
	{
		question: "How do I volunteer or foster a dog?",
		answer:
			"You can apply to volunteer or foster a dog through our website. We have an application form that you can fill out.",
	},
	{
		question:
			"I have submitted my application to adopt a dog. What happens next?",
		answer:
			"Once you submit your application, our team will review it and contact you for a home visit and interview. Then we will contact your references and vet to ensure you are a good fit for the dog. After that, we will schedule a meet with the adoption coordinator, who will schedule a meet and greet with a dog you are interested in adopting.",
	},
	{
		question: "What does the adoption fee cover?",
		answer:
			"The adoption fee covers the dog's vaccinations, spay/neuter surgery, microchip, and any other necessary medical care.",
	},
	{
		question: "Where is your rescue located?",
		answer:
			"We don't have a central facility, our dogs are in foster homes across the state. We can arrange meet and greets with the dog you are interested in adopting.",
	},
	{
		question: "Do you adopt out of state?",
		answer:
			"We only make placements in state. The logistics of out of state adoptions are too difficult to manage. We do not ship dogs.",
	},
];

export default function FAQPage() {
	const [openIndex, setOpenIndex] = useState(null);

	const toggleFAQ = (index) => {
		setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	return (
		<div className="min-h-screen md:w-[calc(100vw-300px)]  p-8">
			<h1 className="text-4xl font-bold mb-8 text-center">
				Frequently Asked Questions
			</h1>
			<div className="max-w-3xl mx-auto">
				{faqs.map((faq, index) => (
					<div key={index} className="border-b border-gray-300 py-4">
						<button
							onClick={() => toggleFAQ(index)}
							className="w-full text-left focus:outline-none"
						>
							<div className="flex justify-between items-center">
								<span className="text-xl font-medium">
									{faq.question}
								</span>
								<svg
									className={`w-6 h-6 transform transition-transform duration-200 ${
										openIndex === index ? "rotate-180" : "rotate-0"
									}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									></path>
								</svg>
							</div>
						</button>
						{openIndex === index && (
							<div className="mt-2 text-gray-700">{faq.answer}</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
