import { useRef } from 'react';
import { Link } from 'react-router';
import { CollectionBanner } from '~/components/CollectionBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader() {
    return {};
}

export default function FreeResizing() {
    return (
        <>
            <div className="free-resizing-page">
                <CollectionBanner collection={collectionContext} />

                <div class="description-container-line">
                </div>
                <div class="free-resizing-content-wrapper">
                    <div class="free-resizing-content-inner">

                        <div class="section">
                            <h2>Engagement and Wedding</h2>
                            <p>
                                At Cullen Jewellery, we offer One Free Resize for engagement and wedding rings
                                to use within the first 12 months of your ring's completion (subject to eligible
                                design style/metal type). You can find the resize range for each ring on its specific
                                product page.
                            </p>
                            <p>
                                <b>
                                    Please be aware that resizing your ring beyond 12 months from the order’s
                                    completion date, or after the complimentary resize has been utilised, will
                                    incur a fee.
                                </b>
                            </p>
                        </div>

                        <div class="section">
                            <h2>Ready-To-Ship</h2>
                            <p>
                                For Ready-To-Ship rings, we offer <b>One Free Resize</b> to use within 12 months
                                of your ring's completion date. If your ring has already been resized from the
                                stock size (typically M 1/2), and you wish to resize it again, it will need to be
                                submitted for assessment to determine the possible resizing range. It’s important
                                to know that once a ring has been resized for the first time, it often can have
                                reduced resize range.
                            </p>
                            <p>
                                <b>
                                    When purchasing a ready-to-ship ring we recommend having your ring size checked
                                    in one of our showrooms prior to to the intial resize.
                                </b>
                            </p>
                        </div>
                        {/* Section Start */}
                        <div class="section">
                            <h2>Men's Wedding Bands</h2>
                            <ul>
                                <li>Men's wedding bands come with one free-size replacement (exc. custom designs).</li>
                                <li>
                                    The original engraving placed during the order purchase will be included in the
                                    one-time free replacement of the ring size.
                                </li>
                                <li>Our workshop will need to assess all custom-made rings for resizing availability.</li>
                                <li>Carbon fibre and tantalum metal rings cannot be resized.</li>
                                <li>
                                    Once the one-time free replacement has been used, if you still wish to change the
                                    ring size, we will need to look into resize availability options, depending on the
                                    design and metal type.
                                </li>
                                <li>
                                    In order to fulfil the resize replacement, the original ring must be returned.
                                </li>
                            </ul>
                        </div>

                        <div class="section">
                            <h2>Resizing Rings with Engraving</h2>
                            <p>
                                In most cases, we place your engraving on the side of the ring to avoid removing it
                                when resizing your ring. However, please note that there can be cases where your
                                engraving cannot be avoided and we will need to redo it. This will be done at no cost
                                to you.
                            </p>
                        </div>

                        <div class="section">
                            <h2>How to Request a Resize</h2>
                            <ul>
                                <li>
                                    <b>(Recommended)</b> Make an appointment at one of our showrooms and have your ring
                                    size accurately measured. Please note that resizing your ring may take 2-3 business
                                    weeks from the time we receive it. You can
                                    <Link class="fancy bold" to="/visit"> book an appointment here</Link>.
                                </li>
                                <li>
                                    Alternatively, you can contact our team to arrange for your ring to be posted back
                                    to us. In this case, you will need to be accurate with the new ring size you request.
                                    Only one complimentary resizing is granted per purchase. Please
                                    <Link class="fancy bold" to="/contact"> contact us here</Link>
                                    to arrange this.
                                </li>
                            </ul>
                        </div>

                        <div class="section">
                            <h2>Free Resizing Terms and Conditions</h2>
                            <ul>
                                <li>
                                    Cullen Jewellery offers one-time complimentary postage, both ways, for your
                                    one-time free resize within 12 months from your ring's completion date.
                                </li>
                                <li>
                                    Once the one-time shipping label is provided, we require the ring to be returned
                                    to us within 30 business days.
                                </li>
                                <li>
                                    If the ring resize request is outside the resizing availability guidelines, your
                                    ring setting may need to be remade, which incurs a setting remake fee and takes
                                    40 business days to complete, excluding shipping. Payment will be required upfront
                                    to begin the process.
                                </li>
                                <li>Resizing your ring at an unauthorised jeweller will void your warranty.</li>
                                <li>
                                    Some rings cannot be resized due to the design. This will be clearly specified in
                                    the product description of any such ring or you will be advised by our team during
                                    the custom design process.
                                </li>
                                <li>
                                    Our 12 month free-resize period policy applies to all ring orders completed from
                                    June 30 2024.
                                </li>
                                <li>
                                    Resizing your ring beyond 12 months from the order’s completion date, or after the
                                    complimentary resize has been utilised, will incur a fee.
                                </li>
                            </ul>
                        </div>

                        <div class="section">
                            <p><i>The following rings <b>cannot</b> be resized:</i></p>
                            <ul>
                                <li>Full pavé bands</li>
                                <li>Open Bands</li>
                                <li>Pt600</li>
                                <li>Carbon Fibre</li>
                                <li>Tantalum</li>
                            </ul>
                        </div>

                        <div class="section">
                            <p>
                                <i>
                                    Platinum, White Gold, Yellow Gold and Rose Gold rings <b>can</b> be resized by the
                                    following amount:
                                </i>
                            </p>
                            <ul>
                                <li><b>Pavé band</b> – (⅔ pavé and less) 2.5 sizes up or 2 sizes down.</li>
                                <li><b>Triple pavé band</b> – 1 size up or 1/2 down only.</li>
                                <li><b>Plain band</b> – 4 sizes up or down.</li>
                                <li>Subject to customs design style.</li>
                                <li>Please note: The above size ranges are in AU sizing.</li>
                            </ul>
                        </div>

                        <div class="section">
                            <p><i>Exceptions to the above resizing rules:</i></p>
                            <ul>
                                <li>
                                    <b>Basket Settings</b> – Due to the nature of the basket, it is unable to be bent
                                    around like a normal band and, therefore cannot be resized by much without the band
                                    looking more like an oval.<br />
                                    A basket setting can be resized ½ size less than the above “can be resized” sizes
                                    depending on if your ring is a plain, pavé or triple pavé band. For example, a basket
                                    setting with a pavé band can only be resized 2 sizes up and 1.5 sizes down.
                                </li>
                                <li>
                                    <b>Cathedral Settings</b> – Due to the cathedral design, the jewellers ability to
                                    maintain a round shape is limited because only the bottom half of the band can be
                                    rounded which means the ring can look oval when a large resize is done. A Cathedral
                                    Setting can be resized ½ size less than the above “can be resized” sizes depending
                                    on if your ring is a plain, pavé or triple pavé band.
                                </li>
                                <li>
                                    <b>Certain Custom Rings</b> – We will need to assess certain custom rings before
                                    determining if a resize is possible to ensure the structural integrity of the ring
                                    is maintained.
                                </li>
                            </ul>
                        </div>

                        <div class="section">
                            <p>
                                <i>
                                    If you have a question regarding resizing please
                                    <a class="fancy" href="/contact"> contact us here</a>.
                                </i>
                            </p>
                        </div>

                    </div>
                </div>


                <UvpIconFooter data={OUR_STORY_UVPS} />
            </div>
        </>
    );
}
const collectionContext = {
    handle: 'Free Resizing',
    title: 'Free Resizing',
    description: '',
    image: {
        url: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/image_73c42a1a-9c6e-4389-92fa-72ed0fe226b1_2000x2000.jpg?v=1701732663'
    }
};
const OUR_STORY_UVPS = [
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