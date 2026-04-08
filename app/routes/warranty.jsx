import { useRef } from 'react';
import { Link } from 'react-router';
import { UvpIconFooter } from '~/components/UvpIconFooter';

export async function loader() {
    return Response.json({});
}

export const meta = () => {
    return [{ title: 'Lifetime Warranty | Diamond Hydrozen' }];
};



export default function Warranty() {
    return (
        <>
            <div className="warranty-page">
                <h2 className='main-warranty-title'><p>Lifetime Manufacturing Warranty</p></h2>
                <div className="description-container-line">
                </div>
                <div className="warranty-content-inner">
                    <div className="section">

                        <p>
                            At Cullen Jewellery, we pride ourselves on the expert craftsmanship of our fine jewellery.
                            Our mission will always be to provide beautiful, responsible jewellery that can be enjoyed
                            for a lifetime. For this reason, every piece of jewellery we craft undergoes rigorous quality
                            control testing.
                        </p>

                        <h2>Australian Consumer Law</h2>

                        <p>
                            Our products and services come with guarantees that cannot be excluded under the Australian
                            Consumer Law.
                        </p>

                        <p><b>If you have a problem with a product:</b></p>

                        <ul>
                            <li>
                                Minor problems – If the issue is minor and can be fixed, we will repair it at no cost within
                                a reasonable time. If it is not repaired within a reasonable time, you may choose a refund
                                or replacement.
                            </li>
                            <li>
                                Major problems – If the problem is major (for example, the item is unsafe, very different
                                from its description, substantially unfit for purpose, or cannot be repaired within a
                                reasonable time), you may choose a refund, replacement, or keep the item and receive
                                compensation for any drop in value.
                            </li>
                        </ul>

                        <p className="p-is-bold"><b>If you have a problem with a service:</b></p>

                        <ul>
                            <li>
                                Minor problems – We will fix the problem at no cost within a reasonable time. If not fixed
                                within a reasonable time, you may cancel the service and receive a refund for the unused
                                portion or have it completed elsewhere at our cost.
                            </li>
                            <li>
                                Major problems – If the problem is major, you may cancel the service immediately and receive
                                a refund for the unused portion, or keep the service at a reduced price.
                            </li>
                        </ul>

                        <p className="p-is-bold"><b>Compensation for loss or damage:</b></p>

                        <ul>
                            <li>
                                You may also be entitled to compensation for any reasonably foreseeable loss or damage
                                caused by a problem with our goods or services.
                            </li>
                        </ul>

                        <p>
                            For more information about your rights, visit the Australian Competition and Consumer
                            Commission website at{' '}
                            <a href="https://www.accc.gov.au" target="_blank" rel="noopener noreferrer">
                                www.accc.gov.au
                            </a>.
                        </p>

                        <h2>Exceptions to Guarantees</h2>

                        <p>Consumer guarantees <b>do not apply</b> if you:</p>

                        <ul>
                            <li>
                                Received what you asked for, but simply changed your mind, found it cheaper elsewhere,
                                decided you did not like the purchase or had no use for it;
                            </li>
                            <li>Misused the product in any way that caused the problem;</li>
                            <li>Knew of or were made aware of any faults before you bought the product;</li>
                            <li>
                                Asked for a service to be completed in a certain way against the advice of Cullen Jewellery,
                                or were unclear about what you wanted.
                            </li>
                        </ul>

                        <h2>Lifetime Manufacturing Warranty Coverage</h2>

                        <p className="p-is-bold"><b>Engagement Rings, Wedding Rings &amp; Fashion Rings</b></p>

                        <ul>
                            <li>
                                <b>Coverage:</b> Lifetime Manufacturing Warranty from the date of receipt on all engagement
                                rings, wedding rings &amp; fashion rings.
                            </li>
                            <li>
                                <b className='bold-text-title'>What’s Covered:</b> Manufacturing defects relating to the structure of the jewellery,
                                including:
                                <ul>
                                    <li>Porosity, surface pores, or blemishes in the metal.</li>
                                    <li>Uneven settings identified at pick-up or during servicing.</li>
                                    <li>Chips, scratches, or nicks in stones identified at pick-up or during servicing.</li>
                                    <li>Rhodium plating stains or “splashes” identified at pick-up or during servicing.</li>
                                </ul>
                            </li>
                        </ul>

                        <p className="p-is-bold"><b>Fine Jewellery – Earrings, Chains, Bracelets &amp; Pendants</b></p>

                        <ul>
                            <li>
                                <b>Coverage:</b> 2-Year Manufacturing Warranty on earrings, chains, bracelets and pendants
                                from the date of completion against manufacturing defects.
                            </li>
                            <li>
                                <b>What’s Covered:</b> Structural defects are generally visible within the first few months
                                of wear.
                            </li>
                            <li><b>Remedy:</b> Any defective item will be repaired or replaced at no cost.</li>
                            <li>
                                <b>Repairs:</b> Items outside of the 24-month Manufacturer’s Warranty period will need to be
                                individually assessed for repair or replacement cost.
                            </li>
                        </ul>

                        <p className="p-is-bold"><b>Precious Gemstones – Lab-Diamonds, Moissanite &amp; Sapphires</b></p>

                        <ul>
                            <li>
                                <b>Coverage:</b> Lifetime Manufacturing Warranty covers all Lab-Diamond, Moissanite,
                                Sapphire stones and applies only to the characteristics selected at the time of sale.
                            </li>
                            <li>
                                <b>Excludes:</b> Wear-and-tear damage, accidental loss, mishandling, theft, chipping,
                                cracking, or breakage from impact.
                            </li>
                        </ul>

                        <h2>Claiming your Lifetime Manufacturing Warranty</h2>

                        <p>If you believe your jewellery has a manufacturing issue, please complete the steps below:</p>

                        <ul>
                            <li>
                                Contact us via our <a className="fancy" href="/contact">contact form</a> and one of our team
                                members will be in touch with you.
                            </li>
                            <li>
                                Upon discussion with one of our team members, we can arrange the best way to return your product for an assessment by dropping it off at any one of our Showrooms or via Post. When returning by mail, all returns must include the original packaging and accompanying materials, including the packing slip and all stone certificates. Wrap the jewellery securely in a protective shipping package together with a copy of the invoice and a note with your contact details. Failure to do so may result in you not receiving the full refund amount as we are not held responsible for incorrect packing.
                            </li>
                            <li>
                                There is a $40 AUD two-way postage fee (within Australia) or $200 AUD two-way Postage fee
                                (from outside Australia) that is required as a postage deposit;
                            </li>
                            <li>
                                Please thoroughly read through what is and what is not covered by our Lifetime
                                Manufacturing Warranty as the postage deposit will not be refunded if the issue is found
                                not to be a manufacturing defect;
                            </li>
                            <li>
                                We will conduct a free assessment of the jewellery to determine whether the damage is under
                                warranty;
                            </li>
                            <li>
                                If the issue is found to be a manufacturing defect, your postage deposit will be refunded
                                in full, and the repair will be conducted at no charge;
                            </li>
                        </ul>

                        <p className="p-is-italic"><i>Repairs or services performed by any jeweller other than Cullen Jewellery will void your Lifetime Manufacturing Warranty.</i></p>

                        <h2>Wear and Tear (not covered by Lifetime Manufacturing Warranty)</h2>

                        <p>
                            All fine jewellery, particularly rings, can be affected by normal wear and everyday
                            activities. Our Lifetime Manufacturing Warranty does not cover any damage to jewellery, loss
                            of stones due to accidents, mishandling or abusive use, theft or damage caused by general
                            wear and tear.
                        </p>

                        <p>
                            Some examples of common jewellery issues that wouldnot be considered manufacturing defects include:
                        </p>

                        <ul>
                            <li>Dents, abrasions and scratches on the settings. Metals are malleable and over time they will exhibit signs of wear. We recommend booking a yearly jewellery assessment where a jeweller can check that your stone settings are secure. After a professional clean and polish, your ring will
                                be looking brand new again.</li>
                            <li>Chips, scratches, nicks, and breakages on the gemstones due to wear and tear or accidents. Diamonds and moissanite are the hardest gemstones on earth, but they are not indestructible. If a gemstone is hit or knocked at a certain angle, it can chip or crack. Regardless of the impact
                                force, a gemstone is highly susceptible to breaking when hit along its weakest part (usually the edges or girdle). Gemstones set with exposed edges, such as in a prong setting, are at higher risk of sustaining damage.</li> <li>Pits and holes in your setting created by exposure to corrosive chemicals e.g. chlorine bleach, heavy cleaning products.</li> <li>The discolouration of precious metals caused by chemicals, make-up, exposure to chlorine in pools and hot tubs, or bathing.</li> <li>Precious metals (especially claws and bands) can wear down over time and may need to be restored as part of normal wear.</li> <li>Prongs that get caught, bent or worn down by everyday wear and allow a stone to fall out.</li> <li>The loss of a gemstone caused by damage from everyday wear or from other damage.</li>
                        </ul>

                        <p className="p-is-italic">
                            Our Lifetime Manufacturing Warranty is only valid with proof of purchase provided and if the
                            jewellery has not been altered in any way.
                        </p>

                        <h2>Jewellery Care</h2>

                        <p>
                            To maintain the beauty and life of your ring, we recommend taking your ring off for any
                            hands-on work. Jewellery should be the last thing you put on when going out and the first
                            thing you take off when home.
                        </p>

                        <p>
                            View our <a className="fancy" href="/jewellery-care">ring care guide</a> for more information.
                        </p>

                    </div>
                </div>



                <UvpIconFooter data={OUR_WARRANTY_UVPS} />
            </div>
        </>
    );
}

const OUR_WARRANTY_UVPS = [
    {
        link: '/shipping',
        label: 'Worldwide<br>Express Shipping',
        svg: `
      <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16.75H2v-1.5h10v1.5Zm13.074 8.417c-.332.37-.807.583-1.304.583H8.196a1.752 1.752 0 0 1-1.74-1.942l.448-4.058H4v-1.5h4.578l-.63 5.723a.248.248 0 0 0 .248.277H23.77a.247.247 0 0 0 .186-.083.247.247 0 0 0 .062-.194l-1.47-13.223H9.454l-.312 2.827-1.492-.165.46-4.162h3.641v-.92c0-2.344 1.907-4.25 4.25-4.25s4.25 1.906 4.25 4.25v.92h3.642l1.617 14.557Z" fill="#6b6b6b"/>
      </svg>
    `,
    },
    {
        link: '/free-resizing',
        label: 'Free<br>Resizing',
        svg: `<svg data-name="Icons Expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M24.289 18.18c0 5.122-4.167 9.289-9.289 9.289s-9.289-4.167-9.289-9.29a9.286 9.286 0 0 1 5.615-8.533l.593 1.376a7.788 7.788 0 0 0-4.708 7.158c0 4.295 3.495 7.789 7.789 7.789s7.789-3.494 7.789-7.79c0-4.294-3.495-7.788-7.789-7.788-.259 0-.518.018-.768.044l-.367.037-4.585-4.84 2.495-3.382h6.45l2.492 3.377-2.55 2.733-1.097-1.024 1.7-1.82-1.302-1.766h-4.936l-1.3 1.761 3.22 3.4c.181-.013.364-.02.548-.02 5.122 0 9.289 4.167 9.289 9.289ZM11.75 18h-1.5v4.75H15v-1.5h-2.19l5.44-5.44V18h1.5v-4.75H15v1.5h2.19l-5.44 5.44V18Z" fill="#fff"></path></svg>`,
    },
    {
        link: '/warranty',
        label: 'Lifetime Ring<br>Warranty',
        svg: `<svg data-name="Icons Expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 2.587 4.25 8.793v7.362a8.774 8.774 0 0 0 4.375 7.577L15 27.413l6.375-3.68a8.774 8.774 0 0 0 4.375-7.578V8.793L15 2.587Zm9.25 13.568a7.271 7.271 0 0 1-3.625 6.279L15 25.68l-5.625-3.247a7.271 7.271 0 0 1-3.625-6.28V9.66L15 4.32l9.25 5.34v6.495Zm-11.733.268 3.906-3.906a3.516 3.516 0 0 1 4.967 0 3.516 3.516 0 0 1 0 4.966c-.685.685-1.584 1.027-2.484 1.027s-1.799-.342-2.483-1.027l-.572-.571 1.06-1.06.572.57a2.015 2.015 0 0 0 2.846 0 2.014 2.014 0 0 0 0-2.845 2.015 2.015 0 0 0-2.846 0l-3.906 3.906a3.516 3.516 0 0 1-4.967 0 3.516 3.516 0 0 1 0-4.966 3.516 3.516 0 0 1 4.967 0l.589.588-1.061 1.06-.588-.588a2.015 2.015 0 0 0-2.846 0 2.014 2.014 0 0 0 0 2.846 2.015 2.015 0 0 0 2.846 0Z" fill="#fff"></path></svg>`,
    },
    {
        link: '/engagement-rings?metal=yellow_gold',
        label: 'Free Ring<br>Customisation',
        svg: `<svg data-name="Icons Expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="m28.42 9.978-4.77 4.769a4.152 4.152 0 0 1-2.331 1.166l-4.204.6-3.11 3.11-1.06-1.061 3.11-3.11.6-4.203a4.15 4.15 0 0 1 1.166-2.332l4.77-4.77 1.06 1.061-4.77 4.77a2.642 2.642 0 0 0-.741 1.483l-.494 3.46 3.46-.494a2.638 2.638 0 0 0 1.484-.741l4.769-4.769 1.06 1.06ZM8.07 21.118c-2.905 0-5.097-2.256-5.097-5.28 0-3.01 2.213-5.28 5.147-5.28 1.144 0 2.063.238 2.894.749.371.228.734.513 1.14.896l1.028-1.092A8.466 8.466 0 0 0 11.8 10.03c-1.077-.662-2.247-.97-3.68-.97-3.727 0-6.647 2.977-6.647 6.813 0 3.782 2.898 6.746 6.597 6.746 2.586 0 4.076-1.136 5.193-2.247l-1.057-1.063c-1.093 1.086-2.214 1.81-4.136 1.81Zm7.936-.38h4v-1.5h-4v1.5Zm-1.408 1.9 2.828 2.83 1.06-1.061-2.828-2.829-1.06 1.06Z" fill="#fff"></path></svg>`,
    },
];