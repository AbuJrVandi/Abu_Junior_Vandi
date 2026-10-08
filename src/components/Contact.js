import { portfolio } from "../portfolio";
import { useState } from 'react';
import emailjs from '@emailjs/browser';
const initial = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
};
export const Contact = () => {
  const [form, setForm] = useState(initial);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  const update = e => setForm({ ...form,
    [e.target.name]: e.target.value
  });

  const submit = async e => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setStatus(null);

    try {
      await emailjs.send(portfolio.email.serviceId, portfolio.email.templateId, {
        from_name: `${form.firstName} ${form.lastName}`,
        from_email: form.email,
        phone: form.phone,
        message: form.message
      }, portfolio.email.publicKey);
      setForm(initial);
      setStatus({
        success: true,
        message: portfolio.copy.contactSuccess
      });
    } catch {
      setStatus({
        success: false,
        message: portfolio.copy.contactError
      });
    } finally {
      setSending(false);
    }
  };

  return <section className="contact content" id="connect"><div className="contact-intro"><p className="section-label"><span />{portfolio.copy.getInTouch}</p><h2>{portfolio.copy.haveAnIdea}<br />{portfolio.copy.letSMakeIt}<br /><em>{portfolio.copy.somethingGreat}</em><sup aria-hidden="true">✣</sup></h2><p className="body-copy">{portfolio.copy.contactDescription}</p><a className="text-link" href={portfolio.copy.linkedinUrl}>{portfolio.copy.connectOnLinkedIn}</a></div><form onSubmit={submit} className="contact-form"><div className="form-pair"><label>{portfolio.copy.firstName}<input name="firstName" autoComplete="given-name" value={form.firstName} onChange={update} placeholder={portfolio.copy.yourFirstName} required /></label><label>{portfolio.copy.lastName}<input name="lastName" autoComplete="family-name" value={form.lastName} onChange={update} placeholder={portfolio.copy.yourLastName} required /></label></div><div className="form-pair"><label>{portfolio.copy.emailAddress}<input type="email" name="email" autoComplete="email" value={form.email} onChange={update} placeholder={portfolio.copy.youExampleCom} required /></label><label>{portfolio.copy.phone} <span className="optional">{portfolio.copy.optional}</span><input type="tel" name="phone" autoComplete="tel" value={form.phone} onChange={update} placeholder={portfolio.copy.yourPhoneNumber} /></label></div><label>{portfolio.copy.tellMeAboutYourProject}<textarea name="message" rows="5" value={form.message} onChange={update} placeholder={portfolio.copy.whatWouldYouLikeToCreate} required /></label><button className="pill-button" disabled={sending}>{sending ? portfolio.copy.sending : portfolio.copy.sendMessage} <span aria-hidden="true">↗</span></button><div aria-live="polite">{status && <p className={status.success ? 'form-success' : 'form-error'}>{status.message}</p>}</div></form></section>;
};
