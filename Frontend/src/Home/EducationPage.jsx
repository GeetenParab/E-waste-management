// EwasteAwareness.js
import React from 'react';

const EducationPage = () => {
  return (
    <div className="bg-orange-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">E-Waste Awareness</h1>
        
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-orange-600 mb-4">What is E-Waste?</h2>
          <p className="text-lg text-gray-700">
            E-waste, or electronic waste, refers to discarded electrical or electronic devices. This includes items such as
            computers, smartphones, televisions, and batteries. With rapid technological advancements, e-waste is one of
            the fastest-growing waste streams in the world.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-orange-600 mb-4">Impact of E-Waste</h2>
          <p className="text-lg text-gray-700">
            Improper disposal of e-waste can lead to significant environmental and health hazards. Toxic substances such
            as lead, mercury, and cadmium can leach into the soil and water, posing risks to human health and the ecosystem.
            Additionally, e-waste contributes to the depletion of natural resources as valuable materials are wasted.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-orange-600 mb-4">How is E-Waste Processed?</h2>
          <p className="text-lg text-gray-700">
            The e-waste recycling process involves several steps:
          </p>
          <ol className="list-decimal ml-6 text-gray-700">
            <li className="mb-2">Collection: E-waste is collected from various sources, including households and businesses.</li>
            <li className="mb-2">Sorting: Collected e-waste is sorted into different categories based on the type of material and components.</li>
            <li className="mb-2">Dismantling: Technicians dismantle devices to separate reusable parts and hazardous materials.</li>
            <li className="mb-2">Recycling: Reusable components are refurbished and recycled. Precious metals like gold and silver are extracted and reused.</li>
            <li className="mb-2">Disposal: Non-recyclable materials are disposed of safely, ensuring minimal environmental impact.</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-orange-600 mb-4">What Can You Do?</h2>
          <p className="text-lg text-gray-700">
            You can help reduce e-waste by:
          </p>
          <ul className="list-disc ml-6 text-gray-700">
            <li className="mb-2">Recycling: Always recycle your electronic devices at designated e-waste recycling centers.</li>
            <li className="mb-2">Donating: Consider donating functional electronics to charities or schools.</li>
            <li className="mb-2">Purchasing: Choose energy-efficient devices and reduce unnecessary upgrades.</li>
            <li className="mb-2">Awareness: Spread the word about e-waste and its environmental impact.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default EducationPage;
