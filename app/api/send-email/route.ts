import { SendMailClient } from "zeptomail";

export async function POST(request: Request) {
    const token =
        "Zoho-enczapikey PHtE6r0NRerijm97p0NV5aTtRMamMNkt/75jKlQVtIZEDvVWH01T+d59wz+y/h8iXfJAEqXInI1hseiesbiHJDy7ZGlMDWqyqK3sx/VYSPOZsbq6x00euVQYdEzaV4HvdtRp1SXSut3cNA==";

    let client = new SendMailClient({ token });

    const { email, name, company, mobile, date, time, message = null } = await request.json();

    await client.sendMail({
        bounce_address: "bounce@rewardsplus.in", // Add the bounce address here
        from: {
            address: "hello@rewardsplus.in",
            name: "noreply",
        },
        to: [
            {
                email_address: {
                    address: "hello@digitaljanet.com",
                },
            },
        ],
        subject: "New Inquiry Received via DigitalJanet Contact Form",
        htmlbody: `<div>
        <p>Hi DigitalJanet Team,</p>
        <p>This email is to notify you of a new inquiry received through the DigitalJanet contact form.</p>
        <p>
        <br>
        <br>
        Inquiry Details:
        <br>
        Name: ${name}
        <br>
        Email: ${email}
        <br>
        Company: ${company}
        <br>
        Mobile: ${mobile}
        <br>
        <br>
        Date: ${date}
        <br>
        <br>
        Time: ${time}
    </div>
    `,
    });

    const result = await client.sendMail({
        bounce_address: "bounce@rewardsplus.in", // Add the bounce address here
        from: {
            address: "hello@rewardsplus.in",
            name: "noreply",
        },
        to: [
            {
                email_address: {
                    address: email,
                },
            },
        ],
        subject: "Thanks for contacting DigitalJanet!",
        htmlbody: `Hi ${name}<div>
        <p>Thank you for reaching out to DigitalJanet! We appreciate you taking the time to contact us.</p>
        <p>We've received your message from our contact form and a member of our team will be in touch with you shortly to discuss your inquiry and how DigitalJanet can help streamline your repair management process.</p>
        <p>Sincerely,</p>
        <p>The DigitalJanet Team</p>
    </div>
    `,
    });

    if (result.message === "OK") {
        return new Response(JSON.stringify({ message: "Email sent successfully!" }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: "Failed to send email!" }), { status: 500 });
    }
}