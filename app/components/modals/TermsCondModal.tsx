interface TermsCondModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const termsList = [
    {
        title: '1. Acceptance of Terms',
        content: 'By registering as a user of the Curdin web application (the “Service”), you agree to be bound by these terms and conditions (the “Terms”), as well as any future modifications or updates to these Terms that may be posted on the Service from time to time. If you do not agree to these Terms, you must not use the Service. You should review these Terms periodically to ensure that you are aware of any changes. Your continued use of the Service after any changes are posted will constitute your acceptance of the revised Terms.'
    },
    {
        title: '2. Registration',
        content: 'In order to use the Service, you must register for an account. You agree to provide accurate and complete information when registering for an account. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure. You must notify Curdin immediately of any breach of security or unauthorized use of your account. Although Curdin will not be liable for your losses caused by any unauthorized use of your account, you may be liable for the losses of Curdin or others due to such unauthorized use.'
    },
    {
        title: '3. User Conduct',
        content: 'You agree to use the Service for lawful purposes only, and in accordance with these Terms and any applicable laws, regulations, and policies. You may not use the Service to engage in any illegal, fraudulent, harmful, abusive, harassing, threatening, defamatory, obscene, hateful, or otherwise objectionable activities, or to interfere with or disrupt the operation of the Service or the servers or networks that host the Service. You may not attempt to gain unauthorized access to the Service, other users’ accounts, or any data or content stored on the Service, by hacking, phishing, or any other means. You may not transmit or upload any viruses, malware, or other harmful or malicious code or content to the Service. You may not use the Service to infringe or violate the rights of any third party, including intellectual property, privacy, or contractual rights. You may not use the Service to send unsolicited or unauthorized advertising, promotional materials, spam, or any other form of solicitation. You may not use the Service to impersonate or misrepresent your identity or affiliation with any person or entity. You may not use the Service to collect or harvest any personal information from other users, or to use any automated means, such as bots, scripts, or crawlers, to access or manipulate the Service. You may not use the Service for any purpose that is not expressly authorized by these Terms or by the Service.'
    },
    {
        title: '4. Privacy Policy',
        content: 'The Service collects and uses your personal information in accordance with its privacy policy, which is incorporated into these Terms by reference. You should review the privacy policy to understand how your information is collected, used, shared, and protected by the Service. By using the Service, you consent to the collection and use of your information as described in the privacy policy.'
    },
    {
        title: '5. Intellectual Property Rights',
        content: 'The Service and all its content, including but not limited to text, graphics, logos, icons, images, audio, video, software, and data, are the property of the Service or its content suppliers, and are protected by copyright, trademark, patent, and other intellectual property laws. You may not copy, reproduce, distribute, transmit, display, perform, modify, create derivative works from, or otherwise exploit any content on the Service without the prior written permission of the Service or the respective content owners. You may not use any trademarks, service marks, trade names, or logos of the Service or its content suppliers without their prior written consent. You may not remove, alter, or obscure any notices or labels on the Service or its content.'
    },
    {
        title: '6. Limitation of Liability',
        content: 'The Service is provided on an “as is” and “as available” basis, without any warranties of any kind, either express or implied. Neither the Service nor its suppliers make any warranty that the Service will be accurate, complete, reliable, secure, or error-free, or that the Service will be available at any particular time or location. You are solely responsible for any damage to your computer system or mobile device, or loss of data, that results from your use of the Service. The Service does not warrant that the Service is free of viruses or other harmful code. You assume all responsibility and risk for your use of the Service.'
    },
    {
        title: '7. Indemnification',
        content: 'You agree to indemnify and hold harmless the Service and its suppliers from any claims, losses, damages, liabilities, including attorneys’ fees, arising out of your use or misuse of the Service, your violation of these Terms, your violation of the rights of any other person or entity, or any breach of the foregoing representations, warranties, and covenants. The Service reserves the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify the Service, and you agree to cooperate with the Service’s defense of these claims. The Service will use reasonable efforts to notify you of any such claim, action, or proceeding upon becoming aware of it.'
    },
    {
        title: '8. Termination',
        content: 'The Service may terminate your access to the Service, without cause or notice, which may result in the forfeiture and destruction of all information associated with your account. If you wish to terminate your account, you may do so by following the instructions on the Service. Any fees paid to the Service are non-refundable. All provisions of these Terms that by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.'
    },
    {
        title: '9. Governing Law',
        content: 'These Terms and Conditions and any disputes or claims arising out of or in connection with them or their subject matter or formation (including non-contractual disputes or claims) are governed by and construed in accordance with the laws of the country in which the Service operates. This means that the Service and its users agree to follow the rules and regulations of that country when interpreting and enforcing these Terms and Conditions. The choice of governing law does not affect the rights of users as consumers according to the consumer protection regulations of their country of residence.'
    }
];

const TermsCondModal = ({open, setOpen}) => {
    if (!open) return null

    return (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Terms and Conditions
                        </h3>
                        <button onClick={() => setOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className={'flex flex-col gap-4 p-6'}>
                        {termsList.map((term, index) => (
                            <div key={index}>
                                <h4 className={'font-bold'}>{term.title}</h4>
                                <div className={'mt-2 text-base leading-relaxed text-gray-500 dark:text-gray-400'}>{term.content}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="button"
                                onClick={() => setOpen(false)}
                                className="focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-orange-900"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TermsCondModal;
