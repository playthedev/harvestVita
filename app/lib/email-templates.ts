import type { CartItem } from './CartContext';
import type { Address } from './user-store';

const gold = '#C9A84C';
const dark = '#2E1530';
const cream = '#F5F0E8';
const darkCard = '#4A2545';

// Inline CID attachment added by the mailer — renders without a public image host.
const logoUrl = 'cid:harvestvita-logo';

function base(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:${dark};font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${dark};padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:${darkCard};border-bottom:2px solid ${gold};padding:24px 40px;text-align:center;">
            <table align="center" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto;">
              <tr>
                <td bgcolor="${cream}" style="background:${cream};border-radius:10px;padding:10px 16px;">
                  <img src="${logoUrl}" alt="HarvestVita by Amooha Farms Pvt Ltd" width="120" style="display:block;width:120px;max-width:100%;height:auto;border:0;outline:none;text-decoration:none;" />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="background:#2E1530;padding:40px;">
            ${body}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:${darkCard};padding:20px 40px;text-align:center;border-top:1px solid rgba(245,240,232,0.08);">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(245,240,232,0.25);">
              &copy; ${new Date().getFullYear()} HarvestVita by Amooha Farms Pvt Ltd &nbsp;&middot;&nbsp; India
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function orderItemsTable(items: CartItem[], total: number, shipping: number): string {
  const rows = items.map(item => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid rgba(245,240,232,0.06);">
        <p style="margin:0;font-family:Georgia,serif;color:${cream};font-size:14px;">${item.name}</p>
        <p style="margin:2px 0 0;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(245,240,232,0.35);">${item.unit} &times; ${item.qty}</p>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid rgba(245,240,232,0.06);text-align:right;font-family:Georgia,serif;color:${gold};font-size:14px;font-weight:bold;">
        &#8377;${(item.price * item.qty).toLocaleString('en-IN')}
      </td>
    </tr>
  `).join('');

  return `
    <table width="100%" cellpadding="0" cellspacing="0">
      ${rows}
      <tr>
        <td style="padding:10px 0;font-family:Arial,sans-serif;font-size:11px;color:rgba(245,240,232,0.5);">Subtotal</td>
        <td style="padding:10px 0;text-align:right;font-family:Arial,sans-serif;font-size:11px;color:rgba(245,240,232,0.5);">&#8377;${total.toLocaleString('en-IN')}</td>
      </tr>
      <tr>
        <td style="padding:4px 0 10px;font-family:Arial,sans-serif;font-size:11px;color:rgba(245,240,232,0.5);">Shipping</td>
        <td style="padding:4px 0 10px;text-align:right;font-family:Arial,sans-serif;font-size:11px;color:${shipping === 0 ? gold : 'rgba(245,240,232,0.5)'};">${shipping === 0 ? 'Free' : '&#8377;' + shipping}</td>
      </tr>
      <tr style="border-top:1px solid rgba(245,240,232,0.12);">
        <td style="padding:12px 0 0;font-family:Arial,sans-serif;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:0.1em;color:${cream};">Total</td>
        <td style="padding:12px 0 0;text-align:right;font-family:Georgia,serif;font-size:20px;font-weight:bold;color:${gold};">&#8377;${(total + shipping).toLocaleString('en-IN')}</td>
      </tr>
    </table>
  `;
}

function addressBlock(address: Address): string {
  return `
    <p style="margin:0;font-family:Georgia,serif;color:${cream};font-size:14px;line-height:1.7;">
      ${address.name}<br/>
      ${address.address1}${address.address2 ? ', ' + address.address2 : ''}<br/>
      ${address.city}, ${address.state} &ndash; ${address.pin}<br/>
      ${address.phone}
    </p>
  `;
}

// ─────────────────────────────────────────────
// 1. Order confirmation → customer
// ─────────────────────────────────────────────
export function orderConfirmationCustomer(opts: {
  orderId: string;
  customerName: string;
  items: CartItem[];
  address: Address;
  total: number;
  shipping: number;
}): { subject: string; html: string } {
  const { orderId, customerName, items, address, total, shipping } = opts;
  const body = `
    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:${gold};">Order Confirmed</p>
    <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:28px;color:${cream};font-weight:bold;line-height:1.15;">
      Thank you, ${customerName.split(' ')[0]}.
    </h1>
    <p style="margin:0 0 28px;font-family:Georgia,serif;font-size:15px;color:rgba(245,240,232,0.6);line-height:1.7;">
      We've received your order and will dispatch it within 2&ndash;3 working days. You'll hear from us once it's on its way.
    </p>

    <!-- Order ID chip -->
    <table cellpadding="0" cellspacing="0" style="background:#3A1A3D;border:1px solid rgba(201,168,76,0.25);margin-bottom:32px;">
      <tr>
        <td style="padding:12px 20px;">
          <span style="font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(245,240,232,0.35);">Order ID &nbsp;</span>
          <span style="font-family:Arial,sans-serif;font-size:12px;letter-spacing:0.15em;color:${gold};font-weight:bold;">${orderId}</span>
        </td>
      </tr>
    </table>

    <!-- Items -->
    <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:${gold};">Your Order</p>
    ${orderItemsTable(items, total, shipping)}

    <div style="height:28px;"></div>

    <!-- Delivery address -->
    <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:${gold};">Delivery Address</p>
    <div style="background:#3A1A3D;border-left:2px solid ${gold};padding:16px 20px;">
      ${addressBlock(address)}
    </div>

    <div style="height:28px;"></div>
    <p style="margin:0;font-family:Georgia,serif;font-size:13px;color:rgba(245,240,232,0.4);line-height:1.7;">
      Questions? Reply to this email or write to us at <a href="mailto:letsconnect@harvestvita.in" style="color:${gold};">letsconnect@harvestvita.in</a>
    </p>
  `;
  return {
    subject: `Order Confirmed — ${orderId} | HarvestVita`,
    html: base('Order Confirmed — HarvestVita', body),
  };
}

// ─────────────────────────────────────────────
// 2. New order notification → owner
// ─────────────────────────────────────────────
export function orderNotificationOwner(opts: {
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  address: Address;
  total: number;
  shipping: number;
}): { subject: string; html: string } {
  const { orderId, customerName, customerEmail, items, address, total, shipping } = opts;
  const body = `
    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:${gold};">New Order Received</p>
    <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:26px;color:${cream};font-weight:bold;">${orderId}</h1>

    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(245,240,232,0.35);">Customer</p>
    <p style="margin:0 0 24px;font-family:Georgia,serif;font-size:15px;color:${cream};">
      ${customerName} &mdash; <a href="mailto:${customerEmail}" style="color:${gold};">${customerEmail}</a>
    </p>

    <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:${gold};">Items</p>
    ${orderItemsTable(items, total, shipping)}

    <div style="height:24px;"></div>
    <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:${gold};">Ship To</p>
    <div style="background:#3A1A3D;border-left:2px solid ${gold};padding:16px 20px;">
      ${addressBlock(address)}
    </div>

    <div style="height:24px;"></div>
    <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:rgba(245,240,232,0.35);">
      Payment: Online (Razorpay) &nbsp;&middot;&nbsp; Dispatch within 2&ndash;3 working days
    </p>
  `;
  return {
    subject: `🛒 New Order ${orderId} — ₹${(total + shipping).toLocaleString('en-IN')}`,
    html: base('New Order — HarvestVita', body),
  };
}

// ─────────────────────────────────────────────
// 3. Contact form acknowledgement → sender
// ─────────────────────────────────────────────
export function contactAcknowledgement(opts: {
  name: string;
  subject: string;
  message: string;
}): { subject: string; html: string } {
  const { name, subject, message } = opts;
  const body = `
    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:${gold};">We received your message</p>
    <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:26px;color:${cream};font-weight:bold;line-height:1.15;">
      Thank you, ${name.split(' ')[0]}.
    </h1>
    <p style="margin:0 0 28px;font-family:Georgia,serif;font-size:15px;color:rgba(245,240,232,0.6);line-height:1.7;">
      We've received your enquiry and will get back to you within two working days.
    </p>

    <div style="background:#3A1A3D;border-left:2px solid ${gold};padding:20px 24px;margin-bottom:28px;">
      <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(245,240,232,0.35);">Subject</p>
      <p style="margin:0 0 16px;font-family:Georgia,serif;color:${cream};font-size:14px;">${subject}</p>
      <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(245,240,232,0.35);">Your Message</p>
      <p style="margin:0;font-family:Georgia,serif;color:rgba(245,240,232,0.6);font-size:14px;line-height:1.7;">${message.replace(/\n/g, '<br/>')}</p>
    </div>

    <p style="margin:0;font-family:Georgia,serif;font-size:13px;color:rgba(245,240,232,0.4);line-height:1.7;">
      In the meantime, explore our full range at <a href="https://harvestvita.in/products" style="color:${gold};">harvestvita.in</a>
    </p>
  `;
  return {
    subject: `We got your message — HarvestVita`,
    html: base('Message Received — HarvestVita', body),
  };
}

// ─────────────────────────────────────────────
// 4. Contact form notification → owner
// ─────────────────────────────────────────────
export function contactNotificationOwner(opts: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): { subject: string; html: string } {
  const { name, email, phone, subject, message } = opts;
  const body = `
    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:${gold};">New Enquiry</p>
    <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:26px;color:${cream};font-weight:bold;">${subject}</h1>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid rgba(245,240,232,0.06);">
          <span style="font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(245,240,232,0.35);">Name</span>
          <p style="margin:4px 0 0;font-family:Georgia,serif;color:${cream};font-size:14px;">${name}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid rgba(245,240,232,0.06);">
          <span style="font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(245,240,232,0.35);">Email</span>
          <p style="margin:4px 0 0;"><a href="mailto:${email}" style="color:${gold};font-family:Georgia,serif;font-size:14px;">${email}</a></p>
        </td>
      </tr>
      ${phone ? `<tr>
        <td style="padding:8px 0;border-bottom:1px solid rgba(245,240,232,0.06);">
          <span style="font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(245,240,232,0.35);">Phone</span>
          <p style="margin:4px 0 0;font-family:Georgia,serif;color:${cream};font-size:14px;">${phone}</p>
        </td>
      </tr>` : ''}
    </table>

    <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(245,240,232,0.35);">Message</p>
    <div style="background:#3A1A3D;border-left:2px solid ${gold};padding:16px 20px;">
      <p style="margin:0;font-family:Georgia,serif;color:rgba(245,240,232,0.75);font-size:14px;line-height:1.8;">${message.replace(/\n/g, '<br/>')}</p>
    </div>

    <div style="height:24px;"></div>
    <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display:inline-block;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;padding:12px 24px;background:${gold};color:${dark};text-decoration:none;">
      Reply to ${name.split(' ')[0]}
    </a>
  `;
  return {
    subject: `📩 New Enquiry: ${subject} — from ${name}`,
    html: base('New Enquiry — HarvestVita', body),
  };
}

// ─────────────────────────────────────────────
// 5. OTP verification email → new user
// ─────────────────────────────────────────────
export function otpEmail(opts: { name: string; otp: string }): { subject: string; html: string } {
  const { name, otp } = opts;
  const digits = otp.split('').map(d =>
    `<td style="width:48px;height:56px;text-align:center;vertical-align:middle;background:#3A1A3D;border:1px solid rgba(201,168,76,0.35);font-family:Georgia,serif;font-size:26px;font-weight:bold;color:${gold};">${d}</td>`
  ).join('<td style="width:8px;"></td>');

  const body = `
    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:${gold};">Verify Your Email</p>
    <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:26px;color:${cream};font-weight:bold;line-height:1.15;">
      Hello, ${name.split(' ')[0]}.
    </h1>
    <p style="margin:0 0 28px;font-family:Georgia,serif;font-size:15px;color:rgba(245,240,232,0.6);line-height:1.7;">
      Enter this code on the verification page to finish creating your HarvestVita account. It expires in <strong style="color:${cream};">10 minutes</strong>.
    </p>

    <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr>${digits}</tr>
    </table>

    <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;color:rgba(245,240,232,0.35);line-height:1.6;">
      If you did not request this, you can safely ignore this email — no account will be created.
    </p>
    <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:rgba(245,240,232,0.35);line-height:1.6;">
      Never share this code with anyone.
    </p>
  `;
  return {
    subject: `${otp} is your HarvestVita verification code`,
    html: base('Verify Your Email — HarvestVita', body),
  };
}

// ─────────────────────────────────────────────
// 6. Welcome email → new user
// ─────────────────────────────────────────────
export function welcomeEmail(opts: { name: string }): { subject: string; html: string } {
  const { name } = opts;
  const body = `
    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:${gold};">Welcome to HarvestVita</p>
    <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:28px;color:${cream};font-weight:bold;line-height:1.15;">
      Hello, ${name.split(' ')[0]}.
    </h1>
    <p style="margin:0 0 24px;font-family:Georgia,serif;font-size:15px;color:rgba(245,240,232,0.6);line-height:1.7;">
      Your account is all set. You can now track your orders, save your delivery address, and build a wishlist of your favourite products.
    </p>

    <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;width:100%;">
      ${[
        ['Track orders', 'Every order you place is saved to your account with real-time status.'],
        ['Saved address', 'Your delivery details are remembered — checkout in seconds.'],
        ['Wishlist', 'Heart any product to save it for later.'],
      ].map(([k, v]) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid rgba(245,240,232,0.06);">
            <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:${gold};">${k}</p>
            <p style="margin:0;font-family:Georgia,serif;font-size:13px;color:rgba(245,240,232,0.5);line-height:1.6;">${v}</p>
          </td>
        </tr>
      `).join('')}
    </table>

    <a href="https://harvestvita.in/products" style="display:inline-block;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;padding:14px 28px;background:${gold};color:${dark};text-decoration:none;font-weight:bold;">
      Start Shopping
    </a>
  `;
  return {
    subject: `Welcome to HarvestVita, ${name.split(' ')[0]}!`,
    html: base('Welcome — HarvestVita', body),
  };
}
