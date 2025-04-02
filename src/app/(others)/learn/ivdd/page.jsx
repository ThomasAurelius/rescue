import React from "react";

const IVDDPage = () => {
	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			{/* Page Title */}
			<h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
				Understanding IVDD in Dachshunds
			</h1>

			{/* Introduction */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Introduction
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					Intervertebral Disc Disease (IVDD) is a serious spinal condition
					that frequently affects Dachshunds. Due to their long backs and
					unique body structure, these dogs are particularly susceptible to
					disc degeneration, herniation, or rupture, which can lead to
					severe pain and mobility issues.
				</p>
				<p className="text-lg text-gray-700">
					Early diagnosis and appropriate management are critical for
					minimizing the impact of IVDD on your Dachshund's quality of
					life.
				</p>
			</section>

			{/* Causes & Risk Factors */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Causes & Risk Factors
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					Several factors contribute to the development of IVDD in
					Dachshunds:
				</p>
				<ul className="list-disc list-inside text-lg text-gray-700 mb-4">
					<li>
						<span className="font-medium">Genetics:</span> A
						predisposition to IVDD runs in many Dachshund bloodlines.
					</li>
					<li>
						<span className="font-medium">Obesity:</span> Excess weight
						increases the load on the spine, worsening disc stress.
					</li>
					<li>
						<span className="font-medium">Age:</span> Older dogs are more
						likely to experience disc degeneration.
					</li>
					<li>
						<span className="font-medium">Activity:</span> High-impact
						activities or improper handling can trigger disc injuries.
					</li>
				</ul>
			</section>

			{/* Symptoms & Diagnosis */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Symptoms & Diagnosis
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					IVDD can present with a variety of symptoms, depending on its
					severity:
				</p>
				<ul className="list-disc list-inside text-lg text-gray-700 mb-4">
					<li>Back pain or sensitivity when touched</li>
					<li>Reluctance to move or play</li>
					<li>Hunched or arched back</li>
					<li>Weakness or loss of coordination in the hind limbs</li>
					<li>In severe cases, partial or complete paralysis</li>
				</ul>
				<p className="text-lg text-gray-700">
					Veterinarians typically diagnose IVDD through physical and
					neurological examinations, supplemented by imaging techniques
					such as X-rays, CT scans, or MRI.
				</p>
			</section>

			{/* Treatment Options */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Treatment Options
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					The treatment plan for IVDD depends largely on the severity of
					the condition:
				</p>
				<ul className="list-disc list-inside text-lg text-gray-700 mb-4">
					<li>
						<span className="font-medium">Conservative Management:</span>{" "}
						Includes strict rest, anti-inflammatory and pain-relief
						medications, and careful monitoring.
					</li>
					<li>
						<span className="font-medium">Surgical Intervention:</span> In
						cases of severe disc herniation or paralysis, surgery may be
						needed to remove the problematic disc material and relieve
						pressure on the spinal cord.
					</li>
					<li>
						<span className="font-medium">Physical Therapy:</span>{" "}
						Post-treatment rehabilitation to restore mobility and
						strengthen supporting muscles.
					</li>
				</ul>
				<p className="text-lg text-gray-700">
					A veterinarian will recommend the most appropriate treatment
					based on the individual dog's condition.
				</p>
			</section>

			{/* Prevention & Management */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Prevention & Management
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					While IVDD cannot always be prevented, there are measures you can
					take to reduce the risk or mitigate the severity:
				</p>
				<ul className="list-disc list-inside text-lg text-gray-700 mb-4">
					<li>
						<span className="font-medium">
							Maintain a Healthy Weight:
						</span>{" "}
						Prevent obesity to lessen stress on the spine.
					</li>
					<li>
						<span className="font-medium">Moderate Exercise:</span> Engage
						in low-impact activities that build muscle without straining
						the back.
					</li>
					<li>
						<span className="font-medium">Proper Handling:</span> Use
						supportive techniques when lifting your Dachshund and avoid
						activities that may cause sudden strain.
					</li>
					<li>
						<span className="font-medium">Regular Check-Ups:</span> Early
						detection through routine veterinary visits can help manage
						the condition effectively.
					</li>
				</ul>
			</section>

			{/* Living with IVDD */}
			<section className="mb-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Living with IVDD
				</h2>
				<p className="text-lg text-gray-700 mb-4">
					Managing IVDD is an ongoing process that requires commitment and
					care. With proper treatment and lifestyle adjustments, many
					Dachshunds can maintain a good quality of life.
				</p>
				<p className="text-lg text-gray-700">
					Home modifications such as ramps, supportive bedding, and careful
					exercise routines can greatly benefit your pet. Additionally,
					joining support groups and connecting with other owners can
					provide valuable insights and encouragement.
				</p>
			</section>

			{/* Conclusion */}
			<section>
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Conclusion
				</h2>
				<p className="text-lg text-gray-700">
					IVDD is a common but manageable condition in Dachshunds. With
					early diagnosis, a tailored treatment plan, and proactive care,
					you can help your furry friend lead a comfortable and fulfilling
					life. Always consult with your veterinarian to develop the best
					strategy for your pet's needs.
				</p>
			</section>
		</div>
	);
};

export default IVDDPage;
