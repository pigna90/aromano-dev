import { useState } from 'react';
import styled from 'styled-components';
import {
  Section,
  SectionContent,
  Title,
  Button,
  Meta,
} from '../styles/SharedStyles';

const ContactLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: 4rem;
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const Intro = styled.div`
  max-width: 38ch;

  p {
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.inkSecondary};
    margin: 0.75rem 0 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: var(--font-size-meta);
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};
`;

const fieldStyles = ({ theme }) => `
  padding: 0.85rem 0.9rem;
  border: ${theme.borders.base} solid ${theme.colors.ink};
  font-size: 1rem;
  font-weight: 500;
  font-family: ${theme.fonts.body};
  color: ${theme.colors.ink};
  background-color: ${theme.colors.surface};
  transition: box-shadow ${theme.motion.fast},
    background ${theme.motion.fast};

  /* Focus drops the field onto a hard offset block instead of glowing. */
  &:focus {
    outline: none;
    box-shadow: ${theme.colors.shadowHardSm};
  }

  &[aria-invalid='true'] {
    border-color: ${theme.colors.danger};
    background-color: ${theme.colors.dangerSoft};
  }

  &::placeholder {
    color: ${theme.colors.inkMuted};
    font-weight: 400;
  }
`;

const Input = styled.input`
  ${fieldStyles}
`;

const TextArea = styled.textarea`
  ${fieldStyles}
  min-height: 150px;
  resize: vertical;
`;

const ErrorMessage = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.danger};
`;

const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.ink};
  background: ${({ theme }) => theme.colors.successSoft};
  border: ${({ theme }) => theme.borders.base} solid
    ${({ theme }) => theme.colors.ink};
  box-shadow: ${({ theme }) => theme.colors.shadowHardSm};
  font-size: 0.9375rem;
  font-weight: 700;
  padding: 0.9rem 1rem;
`;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://formspree.io/f/mblgapjq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <Section id="contact" $sunken>
      <SectionContent>
        <Title>Get in Touch</Title>
        <ContactLayout>
          <Intro>
            <Meta>Talks · Workshops · Mentoring</Meta>
            <p>
              Looking for a speaker, planning a workshop, or just want to talk
              about pricing and agentic AI? Send a note and I&apos;ll get back to
              you.
            </p>
          </Intro>

          <Form onSubmit={handleSubmit} noValidate>
            <InputGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                placeholder="What would you like to talk about?"
                value={formData.message}
                onChange={handleChange}
                aria-invalid={errors.message ? 'true' : 'false'}
              />
              {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
            </InputGroup>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send Message'}
            </Button>

            {submitStatus === 'success' && (
              <SuccessMessage>
                Thank you for your message! I&apos;ll get back to you soon.
              </SuccessMessage>
            )}

            {submitStatus === 'error' && (
              <ErrorMessage>
                Something went wrong. Please try again later.
              </ErrorMessage>
            )}
          </Form>
        </ContactLayout>
      </SectionContent>
    </Section>
  );
};

export default ContactForm;
