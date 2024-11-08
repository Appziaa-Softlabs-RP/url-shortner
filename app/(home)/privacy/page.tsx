'use client'

import { useEffect, useRef, useState } from 'react';

const sections = [
    {
        id: 'introduction',
        title: 'Introduction',
        description: `<p>Welcome to <b>Digital Janet</b>.</p><br />
        <p>Digital Janet (“us”, “we”, or “our”) operates <a href="https://digitaljanet.com" style="color: blue">digitaljanet.com</a> and DigitalJanet mobile application (hereinafter referred to as <b>“Service”</b>).</p><br />
        <p>Our Privacy Policy governs your visit to <a href="https://digitaljanet.com" style="color: blue">digitaljanet.com</a> and DigitalJanet mobile application, and explains how we collect, safeguard, and disclose information that results from your use of our Service.</p><br />
        <p>We use your data to provide and improve Service. By using Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.</p>
        <p>Our Terms and Conditions (<b>“Terms”</b>) govern all use of our Service and together with the Privacy Policy constitutes your agreement with us (<b>“agreement”</b>).</p>`
    },
    {
        id: 'definitions',
        title: 'Definitions',
        description: `<p><strong>SERVICE</strong> means the <a href="https://digitaljanet.com" style="color: blue">digitaljanet.com</a> website operated by <b>Digital Janet</b>.</p><br />
        <p><strong>PERSONAL DATA</strong> means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).</p><br />
        <p><strong>USAGE DATA</strong> means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).</p><br />
        <p><strong>COOKIES</strong> means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).</p><br />
        <p><strong>DATA CONTROLLER</strong> means a natural or legal person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal data are, or are to be, processed. For the purpose of this Privacy Policy, we are a Data Controller of your data.</p><br />
        <p><strong>DATA PROCESSORS (OR SERVICE PROVIDERS)</strong> means any natural or legal person who processes the data on behalf of the Data Controller. We may use the services of various Service Providers in order to process your data more effectively.</p><br />
        <p><strong>DATA SUBJECT</strong> is any living individual who is the subject of Personal Data.</p><br />
        <p><strong>THE USER</strong> is the individual using our Service. The User corresponds to the Data Subject, who is the subject of Personal Data.</p>`
    },
    {
        id: 'information-collection',
        title: 'Information Collection and Use',
        description: `<p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>`
    },
    {
        id: 'types-of-data',
        title: 'Types of Data Collected',
        description: `<p><strong>Personal Data</strong></p>
        <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (“Personal Data”). Personally identifiable information may include, but is not limited to:</p><br />
        <ul>
            <li>(a) Email address</li><br />
            <li>(b) First name and last name</li><br />
            <li>(c) Phone number</li><br />
            <li>(d) Address, State, Province, ZIP/Postal code, City</li><br />
            <li>(e) Cookies and Usage Data</li><br />
        </ul>
        <p>We may use your Personal Data to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing at <a href="mailto:hello@digitaljanet.com">hello@digitaljanet.com</a>.</p><br />
        <p><b>Usage Data</b></p>
        <p>We may also collect information that your browser sends whenever you visit our Service or when you access Service by or through a mobile device (“Usage Data”).</p><br />
        <p>This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p><br />
        <p>When you access Service with a mobile device, this Usage Data may include information such as the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data.</p><br />
        <p><b>Location Data</b></p>
        <p>We may use and store information about your location if you give us permission to do so (“Location Data”). We use this data to provide features of our Service, to improve and customize our Service.</p><br />
        <p>You can enable or disable location services when you use our Service at any time by way of your device settings.</p><br />
        <p><b>Tracking Cookies Data</b></p>
        <p>We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information.</p><br />
        <p>Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Other tracking technologies are also used such as beacons, tags and scripts to collect and track information and to improve and analyze our Service.</p><br />
        <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p><br />

        <p>Examples of Cookies we use:</p></br >

        <p>(a) <b>Session Cookies</b>: We use Session Cookies to operate our Service.</p></br >

        <p>(b) <b>Preference Cookies</b>: We use Preference Cookies to remember your preferences and various settings.</p></br >

        <p>(c) <b>Security Cookies</b>: We use Security Cookies for security purposes.</p></br >

        <p>(d) <b>Advertising Cookies</b>: Advertising Cookies are used to serve you with advertisements that may be relevant to you and your interests</p></br >

        <p><b>Other Data</b></p>
        <p>While using our Service, we may also collect the following information: sex, age, date of birth, place of birth, passport details, citizenship, registration at place of residence and actual address, telephone number (work, mobile), details of documents on education, qualification, professional training, employment agreements, non-disclosure agreements, information on bonuses and compensation, information on marital status, family members, social security (or other taxpayer identification) number, office location and other data.</p>
        `
    },
    {
        id: 'use-of-data',
        title: 'Use of Data',
        description: `<p><b>Digital Janet</b> uses the collected data for various purposes:</p><br />
        <ul>
            <li>(a) to provide and maintain our Service;</li><br />
            <li>(b) to notify you about changes to our Service;</li><br />
            <li>(c) to allow you to participate in interactive features of our Service when you choose to do so;</li><br />
            <li>(d) to provide customer support;</li><br />
            <li>(e) to gather analysis or valuable information so that we can improve our Service;</li><br />
            <li>(f) to monitor the usage of our Service;</li><br />
            <li>(g) to detect, prevent and address technical issues;</li><br />
            <li>(h) to fulfill any other purpose for which you provide it;</li><br />
            <li>(i) to carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection;</li><br />
            <li>(j) to provide you with notices about your account and/or subscription, including expiration and renewal notices, email-instructions, etc.;</li><br />
            <li>(k) to provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information;</li><br />
            <li>(l) in any other way we may describe when you provide the information;</li><br />
            <li>(h) for any other purpose with your consent.</li><br />
        </ul>`
    },
    {
        id: 'retention-of-data',
        title: 'Retention of Data',
        description: '<p>We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p><br /><p>We will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.</p>'
    },
    {
        id: 'transfer-of-data',
        title: 'Transfer of Data',
        description: '<p>Your information, including Personal Data, may be transferred to – and maintained on – computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.</p><br /> <p>If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there.</p><br /><p>Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p><br /> <p>Digital Janet will take all the steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organisation or a country unless there are adequate controls in place including the security of your data and other personal information.</p>'
    },
    {
        id: 'disclosure-of-data',
        title: 'Disclosure of Data',
        description: "<p>We may disclose  personal information that we collect or you provide:<br />(a) Disclosure for Law Enforcement.<br /><br />Under certain circumstances, we may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities.<br /><br />(b) Business Transaction.<br /><br />If we or our subsidiaries are involved in a merger, acquisition or asset sale, your Personal Data may be transferred.<br /><br />(c) Other cases. We may disclose your information also:<br /><br />(i) to our subsidiaries and affiliates;<br /><br />(ii) to fulfill the purpose for which you provide it;<br /><br />(iii) for the purpose of including your company's logo on our website;<br /><br />(iv) for any other purpose disclosed by us when you provide the information;<br /><br />(v) with your consent in any other cases;<br /><br />(vi) if we believe disclosure is necessary or appropriate to protect the rights, property, or safety of the Company, our customers, or others.<br /</p>"
    },
    {
        id: 'security-of-data',
        title: 'Security of Data',
        description: '<p>The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>'
    },
    {
        id: 'data-protection-rights-under-gdpr',
        title: 'Your Data Protection Rights Under GDPR',
        description: '<p>If you are a resident of the European Union (EU) and European Economic Area (EEA), you have certain data protection rights, covered by GDPR. - See more at <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" style="color: blue;">https://eur-lex.europa.eu/eli/reg/2016/679/oj</a></p><br /><p>We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</p><br /><p>If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please email us at hello@digitaljanet.com.</p><br /><p>In certain circumstances, you have the following data protection rights:</p><br /><p>(a) the right to access, update or to delete the information we have on you;</p><br /><p>(b) the right of rectification. You have the right to have your information rectified if that information is inaccurate or incomplete;</p><br /><p>(c) the right to object. You have the right to object to our processing of your Personal Data;</p><br /><p>(d) the right of restriction. You have the right to request that we restrict the processing of your personal information;</p><br /><p>(e) the right to data portability. You have the right to be provided with a copy of your Personal Data in a structured, machine-readable and commonly used format;</p><br /><p>(f) the right to withdraw consent. You also have the right to withdraw your consent at any time where we rely on your consent to process your personal information;</p><br /><p>Please note that we may ask you to verify your identity before responding to such requests. Please note, we may not able to provide Service without some necessary data.</p><br /><p>You have the right to complain to a Data Protection Authority about our collection and use of your Personal Data. For more information, please contact your local data protection authority in the European Economic Area (EEA).</p>'
    },
    {
        id: 'service-providers',
        title: 'Service Providers',
        description: '<p>We may employ third party companies and individuals to facilitate our Service (“Service Providers”), provide Service on our behalf, perform Service-related services or assist us in analysing how our Service is used.</p><br /><p>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>'
    },
    {
        id: 'analytics',
        title: 'Analytics',
        description: `<p>We may use third-party Service Providers to monitor and analyze the use of our Service.</p><br/><p><b>Google Analytics</b></p><p>Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualise and personalise the ads of its own advertising network.</p><br /><p>For more information on the privacy practices of Google, please visit the Google Privacy Terms web page: <a href="https://policies.google.com/privacy?hl=en" style="color: blue">https://policies.google.com/privacy?hl=en</a></p><br /><p>We also encourage you to review the Google's policy for safeguarding your data: <a href="https://support.google.com/analytics/answer/6004245" style="color: blue">https://support.google.com/analytics/answer/6004245</a></p><br /><p><b>Firebase</b></p>
        <p>Firebase is analytics service provided by Google Inc</p><br />
        <p>You may opt-out of certain Firebase features through your mobile device settings, such as your device advertising settings or by following the instructions provided by Google in their Privacy Policy: <a href="https://policies.google.com/privacy?hl=en" style="color: blue">https://policies.google.com/privacy?hl=en</a></p><br />
        <p>For more information on what type of information Firebase collects, please visit the Google Privacy Terms web page: <a href="https://policies.google.com/privacy?hl=en" style="color: blue">https://policies.google.com/privacy?hl=en</a></p>`
    },
    {
        id: 'ci-cd-tools',
        title: 'CI/CD Tools',
        description: `<p>We may use third-party Service Providers to automate the development process of our Service.</p><br />
        <p><b>GitHub</b></p><br />
        <p>GitHub is provided by GitHub, Inc.</p>
        <p>GitHub is a development platform to host and review code, manage projects, and build software.</p><br />
        <p>For more information on what data GitHub collects for what purpose and how the protection of the data is ensured, please visit GitHub Privacy Policy page: <a href="https://help.github.com/en/articles/github-privacy-statement" style="color: blue">https://help.github.com/en/articles/github-privacy-statement</a>.</p><br />

        <p><b>Fastlane</b></p><br />
        <p>Fastlane is provided by Google, Inc.</p><br />
        <p>Fastlane is a continuous delivery tool for iOS and Android apps.</p><br />
        <p>For more information on what data Fastlane collects for what purpose and how the protection of the data is ensured, please visit the Google Privacy Policy page: <a href="https://policies.google.com/privacy" style="color: blue">https://policies.google.com/privacy</a>.</p>`
    },
    {
        id: 'advertising',
        title: 'Advertising',
        description: `<p>We may use third-party Service Providers to show advertisements to you to help support and maintain our Service.</p><br />
        <p><b>Google AdSense DoubleClick Cookie</b></p><br />
        <p>Google, as a third party vendor, uses cookies to serve ads on our Service. Google's use of the DoubleClick cookie enables it and its partners to serve ads to our users based on their visit to our Service or other websites on the Internet.</p><br />
        <p>You may opt out of the use of the DoubleClick Cookie for interest-based advertising by visiting the Google Ads Settings web page: <a href="http://www.google.com/ads/preferences/" style="color: blue">http://www.google.com/ads/preferences/</a></p><br />

        <p><b>AdMob by Google</b></p><br />
        <p>AdMob by Google is provided by Google Inc.</p><br />
        <p>You can opt-out from the AdMob by Google service by following the instructions described by Google: <a href="https://support.google.com/ads/answer/2662922?hl=en" style="color: blue">https://support.google.com/ads/answer/2662922?hl=en</a></p><br />

        <p>For more information on how Google uses the collected information, please visit the “How Google uses data when you use our partners' sites or app” page: <a href="http://www.google.com/policies/privacy/partners/" style="color: blue">http://www.google.com/policies/privacy/partners/</a> or visit the Privacy Policy of Google: <a href="http://www.google.com/policies/privacy/" style="color: blue">http://www.google.com/policies/privacy/</a></p>`
    },
    {
        id: 'behavioral-remarketing',
        title: 'Behavioral Remarketing',
        description: `
            <p>Digital Janet uses remarketing services to advertise on third party websites to you after you visited our Service. We and our third-party vendors use cookies to inform, optimise and serve ads based on your past visits to our Service.</p><br />

            <p><b>Google Ads (AdWords)</b></p><br />
            <p>Google Ads (AdWords) remarketing service is provided by Google Inc.</p><br />
            <p>You can opt-out of Google Analytics for Display Advertising and customize the Google Display Network ads by visiting the Google Ads Settings page: <a href="http://www.google.com/settings/ads" style="color: blue">http://www.google.com/settings/ads</a></p><br />

            <p>Google also recommends installing the Google Analytics Opt-out Browser Add-on - <a href="https://tools.google.com/dlpage/gaoptout" style="color: blue">https://tools.google.com/dlpage/gaoptout</a> - for your web browser. Google Analytics Opt-out Browser Add-on provides visitors with the ability to prevent their data from being collected and used by Google Analytics.</p><br />

            <p>For more information on the privacy practices of Google, please visit the Google Privacy Terms web page: <a href="https://policies.google.com/privacy?hl=en" style="color: blue">https://policies.google.com/privacy?hl=en</a></p><br />

            <p><b>Twitter</b></p><br />
            <p>Twitter remarketing service is provided by Twitter Inc.</p><br />
            <p>You can opt-out from Twitter's interest-based ads by following their instructions: <a href="https://support.twitter.com/articles/20170405" style="color: blue">https://support.twitter.com/articles/20170405</a></p><br />

            <p>You can learn more about the privacy practices and policies of Twitter by visiting their Privacy Policy page: <a href="https://twitter.com/privacy" style="color: blue">https://twitter.com/privacy</a></p><br />

            <p><b>Facebook</b></p><br />
            <p>Facebook remarketing service is provided by Facebook Inc.</p><br />
            <p>You can learn more about interest-based advertising from Facebook by visiting this page: <a href="https://www.facebook.com/help/164968693837950" style="color: blue">https://www.facebook.com/help/164968693837950</a></p><br />
            <p>To opt-out from Facebook's interest-based ads, follow these instructions from Facebook: <a href="https://www.facebook.com/help/568137493302217" style="color: blue">https://www.facebook.com/help/568137493302217</a></p><br />
            <p>Facebook adheres to the Self-Regulatory Principles for Online Behavioural Advertising established by the Digital Advertising Alliance. You can also opt-out from Facebook and other participating companies through the Digital Advertising Alliance in the USA <a href="http://www.aboutads.info/choices/" style="color: blue">http://www.aboutads.info/choices/</a>, the Digital Advertising Alliance of Canada in Canada  <a href="http://youradchoices.ca/" style="color: blue">http://youradchoices.ca/</a> or the European Interactive Digital Advertising Alliance in Europe  <a href="http://www.youronlinechoices.eu/" style="color: blue">http://www.youronlinechoices.eu/</a>, or opt-out using your mobile device settings.</p><br />

            <p>For more information on the privacy practices of Facebook, please visit Facebook's Data Policy: <a href="https://www.facebook.com/privacy/explanation" style="color: blue">https://www.facebook.com/privacy/explanation</a></p>
        `
    },
    {
        id: 'payments',
        title: 'Payments',
        description: `
        <p>We may provide paid products and/or services within Service. In that case, we use third-party services for payment processing (e.g. payment processors).We may provide paid products and/or services within Service. In that case, we use third-party services for payment processing (e.g. payment processors).</p><br />

        <p>We will not store or collect your payment card details. That information is provided directly to our third-party payment processors whose use of your personal information is governed by their Privacy Policy. These payment processors adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, Mastercard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of payment information.</p><br />

        <p>The payment processors we work with are:</p><br />

        <p><b>Razorpay:</b></p>

        <p>Their Privacy Policy can be viewed at:<br /><a href="https://razorpay.com/privacy/" style="color: blue">https://razorpay.com/privacy/</a></p>
`
    },
    {
        id: 'links-to-other-sites',
        title: 'Links to Other Sites',
        description: `
            <p>Our Service may contain links to other sites that are not operated by us. If you click a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p><br />

            <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
        `
    },
    {
        id: 'childrens-privacy',
        title: 'Children\'s Privacy',
        description: `
            <p>Our Services are not intended for use by children under the age of 13 (“<b>Children</b>”).</p><br />

            <p>We do not knowingly collect personally identifiable information from Children under 13. If you become aware that a Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from Children without verification of parental consent, we take steps to remove that information from our servers.</p>
        `
    },
    {
        id: 'changes-to-this-privacy-policy',
        title: 'Changes to This Privacy Policy',
        description: `
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p><br />

            <p>We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update “effective date” at the top of this Privacy Policy.</p><br />

            <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
        `
    },
    {
        id: 'contact-us',
        title: 'Contact Us',
        description: `
            <p>If you have any questions about this Privacy Policy, please contact us:</p><br />

            By email: <a href="mailto:hello@digitaljanet.com" style="color: blue;">hello@digitaljanet.com</a><br />

            By visiting this page on our website:<br /><a href="https://digitaljanet.com/contact" style="color: blue;">https://digitaljanet.com/contact</a>
        `
    }
];

export default function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState('')
    const observerRefs = useRef<{ [key: string]: IntersectionObserver }>({})

    useEffect(() => {
        sections.forEach(section => {
            const element = document.getElementById(section.id)
            if (element) {
                observerRefs.current[section.id] = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            setActiveSection(section.id)
                        }
                    },
                    { threshold: 0.5 }
                )
                observerRefs.current[section.id].observe(element)
            }
        })

        return () => {
            Object.values(observerRefs.current).forEach(observer => observer.disconnect())
        }
    }, [])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl px-[50px] mx-auto mt-20">
                <div className="lg:flex lg:gap-8">
                    <main className="lg:w-2/3">
                        <h1 className="text-4xl font-bold text-secondary mb-8">Privacy Policy</h1>
                        <p className="text-gray-600 mb-8">Effective date: 01/10/2024</p>

                        {sections.map((section, index) => (
                            <section key={section.id} id={section.id} className="mb-12">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{index + 1}.&nbsp;{section.title}</h2>
                                <p className="text-gray-600">
                                    <div dangerouslySetInnerHTML={{ __html: section.description }} />
                                </p>
                            </section>
                        ))}
                    </main>

                    <nav className="lg:w-1/3 mt-8 lg:mt-0">
                        <div className="sticky top-8">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Table of Contents</h2>
                            <ul className="grid gap-2 border-s-[1px] border-primary">
                                {sections.map((section, index) => (
                                    <li key={section.id}>
                                        <a
                                            href={`#${section.id}`}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                scrollToSection(section.id)
                                            }}
                                            className={`text-base flex gap-1 ps-6 py-1 ${activeSection === section.id
                                                ? 'text-primary border-s-[5px] border-primary font-semibold'
                                                : 'text-gray-600 hover:text-primary'
                                                }`}
                                        >
                                            <span>{index + 1}.</span>
                                            <span>{section.title}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}