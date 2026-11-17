import { operator } from '../data/legal';
import { OperatorAddress, Subtitle } from './LegalLayout';

/** Provider identification under § 5 DDG and § 18 Abs. 2 MStV. */
const Impressum = () => (
  <>
    <h1>Impressum</h1>
    <Subtitle>Legal notice</Subtitle>

    <h2>Angaben gemäß § 5 DDG</h2>
    <OperatorAddress />

    <h2>Kontakt</h2>
    <p>
      E-Mail: <a href={`mailto:${operator.email}`}>{operator.email}</a>
      {operator.phone && (
        <>
          <br />
          Telefon: <a href={`tel:${operator.phone.replace(/[^+\d]/g, '')}`}>{operator.phone}</a>
        </>
      )}
      <br />
      Kontaktformular: <a href="/#contact">aromano.dev/#contact</a>
    </p>

    {operator.vatId && (
      <>
        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
          <br />
          {operator.vatId}
        </p>
      </>
    )}

    <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
    <p>{operator.name}, Anschrift wie oben.</p>

    <h2>Geltungsbereich</h2>
    <p>
      Dieses Impressum gilt auch für den Newsletter unter{' '}
      <a href="https://alerom90.substack.com/" target="_blank" rel="noopener noreferrer">
        alerom90.substack.com
      </a>
      .
    </p>
  </>
);

export default Impressum;
