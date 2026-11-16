import { operator, analyticsRetentionMonths, privacyLastUpdated } from '../data/legal';
import { InlineButton, OperatorAddress, Subtitle, Updated } from './LegalLayout';
import { openCookieSettings } from '../utils/analytics';

/**
 * Privacy policy (GDPR Art. 13). Every third party the site talks to is
 * listed here; adding a new embed, font host or API means adding a section.
 */
const Privacy = () => (
  <>
    <h1>Datenschutz</h1>
    <Subtitle>Privacy policy</Subtitle>

    <p>
      This policy explains what personal data is processed when you visit
      aromano.dev, why, and what rights you have. It is written in English
      because the site is.
    </p>

    <h2>1. Controller</h2>
    <p>The controller responsible for this website under the GDPR is:</p>
    <OperatorAddress />
    <p>
      Email: <a href={`mailto:${operator.email}`}>{operator.email}</a>
    </p>

    <h2>2. Hosting and delivery</h2>
    <p>
      This site is hosted on GitHub Pages, a service of GitHub, Inc., 88 Colin
      P. Kelly Jr. Street, San Francisco, CA 94107, USA. Every request passes
      first through Cloudflare, Inc., 101 Townsend Street, San Francisco, CA
      94107, USA, which delivers the site through its network and protects it
      against attacks and abuse.
    </p>
    <p>
      When you open a page, both necessarily receive your IP address and log
      technical request data (date and time, page requested, browser and
      operating system, referring page). This data is used only to deliver the
      site and keep it secure, and each provider deletes its logs according
      to its own retention rules.
    </p>
    <p>
      Legal basis: Art. 6(1)(f) GDPR. My legitimate interest is serving the
      website reliably and securely. GitHub, Inc. and Cloudflare, Inc. are
      both certified under the EU-US Data Privacy Framework, on which
      transfers to the USA are based (Art. 45 GDPR). Details:{' '}
      <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">
        GitHub Privacy Statement
      </a>
      ,{' '}
      <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">
        Cloudflare Privacy Policy
      </a>
      .
    </p>

    <h2>3. Storage in your browser</h2>
    <p>
      The site stores two settings in your browser&apos;s local storage:
      whether you accepted or declined analytics (<code>cookieConsent</code>)
      and, if you switched it, light or dark mode (<code>colorScheme</code>).
      Neither is sent anywhere. Storing them is strictly necessary to provide
      what you asked for, so it needs no consent (§ 25(2) no. 2 TDDDG). You can
      clear them at any time through your browser settings.
    </p>

    <h2 id="analytics">4. Google Analytics (only with your consent)</h2>
    <p>
      If, and only if, you click &quot;Accept&quot; in the cookie banner, the
      site loads Google Analytics 4, a web analytics service of Google Ireland
      Limited, Gordon House, Barrow Street, Dublin 4, Ireland. Until then, no
      request is made to Google.
    </p>
    <p>
      Google Analytics sets cookies (<code>_ga</code> and{' '}
      <code>_ga_&lt;ID&gt;</code>, valid for up to 2 years) and records how
      the site is used: pages viewed, time on page, referring site, device,
      browser, screen size and approximate location derived from your IP
      address. I only see aggregated reports, which help me understand which
      content is useful. Google deletes the event data after{' '}
      {analyticsRetentionMonths} months.
    </p>
    <p>
      Data may be transferred to Google LLC in the USA. Google LLC is
      certified under the EU-US Data Privacy Framework (Art. 45 GDPR).
    </p>
    <p>
      Legal basis: your consent, Art. 6(1)(a) GDPR and § 25(1) TDDDG. You can
      withdraw it at any time, with effect for the future, through the{' '}
      <InlineButton type="button" onClick={openCookieSettings}>
        cookie settings
      </InlineButton>{' '}
      (also linked in the footer of every page). Withdrawing deletes the
      Google Analytics cookies. More information:{' '}
      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
        Google Privacy Policy
      </a>
      .
    </p>

    <h2 id="contact-form">5. Contact form</h2>
    <p>
      If you send a message through the contact form, your name, email address
      and message are transmitted to Formspree, Inc. (USA), which forwards
      them to me by email. Formspree also receives your IP address and
      browser information when you submit the form. I use this data only to
      answer your enquiry and delete it once the conversation is over, unless
      a legal retention duty applies.
    </p>
    <p>
      Legal basis: Art. 6(1)(b) GDPR where your message is about a possible
      engagement (a talk, workshop or mentoring), otherwise Art. 6(1)(f) GDPR,
      my legitimate interest in replying to messages sent to me. Because
      Formspree is based in the USA, your data is transferred to a third
      country. The transfer is based on the EU standard contractual clauses
      (Art. 46(2)(c) GDPR). If you prefer, you can email me directly instead.
      More information:{' '}
      <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
        Formspree Privacy Policy
      </a>
      .
    </p>

    <h3>Contact by email</h3>
    <p>
      Emails to {operator.email} are received by Cloudflare Email Routing
      (Cloudflare, Inc., see section 2) and forwarded to my personal mailbox.
      The same purpose, legal basis and deletion rules apply as for the
      contact form.
    </p>
    <p>
      Giving me your data is neither a legal nor a contractual requirement.
      Without a way to reach you, though, I cannot reply.
    </p>

    <h2>6. Blog posts from Medium and Substack</h2>
    <p>
      The blog section shows my latest articles. To fetch them, your browser
      requests the feeds through rss2json.com (operated from the USA), and
      the article images load directly from Medium (A Medium Corporation,
      USA, <code>miro.medium.com</code>) and Substack (Substack, Inc., USA,{' '}
      <code>substackcdn.com</code>). These providers receive your IP address
      and technical browser data as part of the request, and rss2json logs it
      to run the service, apply rate limits and keep it secure. I receive no
      data from them.
    </p>
    <p>
      Legal basis: Art. 6(1)(f) GDPR. My legitimate interest is showing my
      current writing without maintaining a copy by hand.
    </p>

    <h2>7. Links to other sites</h2>
    <p>
      The site links to profiles and pages elsewhere (GitHub, LinkedIn,
      Medium, Substack, YouTube, MentorCruise, conference sites). Nothing is
      loaded from them until you click a link; from then on, that site&apos;s
      own privacy policy applies.
    </p>

    <h2>8. Your rights</h2>
    <p>Under the GDPR you have the right to:</p>
    <ul>
      <li>access the personal data I hold about you (Art. 15)</li>
      <li>have inaccurate data corrected (Art. 16)</li>
      <li>have your data erased (Art. 17)</li>
      <li>restrict processing (Art. 18)</li>
      <li>receive your data in a portable format (Art. 20)</li>
      <li>
        object at any time to processing based on Art. 6(1)(f) GDPR, on
        grounds relating to your particular situation (Art. 21)
      </li>
      <li>withdraw consent at any time, with effect for the future (Art. 7(3))</li>
    </ul>
    <p>
      To exercise any of these, email{' '}
      <a href={`mailto:${operator.email}`}>{operator.email}</a>. You also have
      the right to lodge a complaint with a data protection supervisory
      authority (Art. 77), in particular in the EU member state where you live
      or work.
    </p>

    <h2>9. Automated decisions</h2>
    <p>No automated decision-making or profiling within the meaning of Art. 22 GDPR takes place.</p>

    <Updated>Last updated: {privacyLastUpdated}</Updated>
  </>
);

export default Privacy;
