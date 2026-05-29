"use client";

import React, { useState } from 'react';
import { Send } from 'lucide-react';

export type FieldType = 'text' | 'email' | 'tel' | 'select' | 'radio' | 'checkbox' | 'textarea' | 'number' | 'file-info';

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

interface EnquiryFormProps {
  mailto: string;
  subject: string;
  fields: FormField[];
  submitText?: string;
}

export default function EnquiryForm({ mailto, subject, fields, submitText = "Send Enquiry" }: EnquiryFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const current = prev[name] || [];
      if (checked) {
        return { ...prev, [name]: [...current, value] };
      } else {
        return { ...prev, [name]: current.filter((v: string) => v !== value) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct email body
    let body = `Enquiry Details:\n\n`;
    fields.forEach(f => {
      if (f.type !== 'file-info') {
        const val = formData[f.name];
        let valStr = 'Not provided';
        if (Array.isArray(val)) valStr = val.join(', ');
        else if (val) valStr = val.toString();
        body += `${f.label}: ${valStr}\n`;
      }
    });
    
    body += `\n---\nSent from JC Apex Ventures Website`;
    
    // Open mailto
    const mailtoUrl = `mailto:${mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '40px' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '32px' }}>Request Details</h3>
      
      {fields.map((field, idx) => (
        <div key={idx} className="form-group animate-fade-in-up" style={{ animationDelay: `${(idx + 1) * 50}ms` }}>
          <label className="form-label">
            {field.label} {field.required && <span style={{ color: 'var(--color-accent)' }}>*</span>}
          </label>
          
          {field.type === 'text' || field.type === 'email' || field.type === 'tel' || field.type === 'number' ? (
            <input 
              type={field.type}
              className="form-input"
              placeholder={field.placeholder}
              required={field.required}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          ) : field.type === 'textarea' ? (
            <textarea 
              className="form-textarea"
              placeholder={field.placeholder}
              required={field.required}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          ) : field.type === 'select' ? (
            <select 
              className="form-select"
              required={field.required}
              onChange={(e) => handleChange(field.name, e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Select an option...</option>
              {field.options?.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          ) : field.type === 'radio' ? (
            <div className="form-radio-group">
              {field.options?.map((opt, i) => (
                <label key={i} className="form-radio-label">
                  <input 
                    type="radio" 
                    name={field.name} 
                    value={opt}
                    className="form-radio"
                    required={field.required}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ) : field.type === 'checkbox' ? (
            <div className="form-checkbox-group">
              {field.options?.map((opt, i) => (
                <label key={i} className="form-checkbox-label">
                  <input 
                    type="checkbox" 
                    value={opt}
                    className="form-checkbox"
                    onChange={(e) => handleCheckboxChange(field.name, opt, e.target.checked)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ) : field.type === 'file-info' ? (
            <div style={{ 
              padding: '16px', 
              background: 'rgba(212,175,55,0.05)', 
              border: '1px dashed var(--color-border-accent)',
              borderRadius: '12px',
              fontSize: '0.9rem',
              color: 'var(--color-text-secondary)',
              marginTop: '4px'
            }}>
              {field.placeholder || "Please attach relevant files directly in the email that opens."}
            </div>
          ) : null}
        </div>
      ))}
      
      <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px', padding: '16px' }}>
        <span>{submitText} <Send size={18} /></span>
      </button>
      
      <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '16px' }}>
        Clicking send will open your default email client with these details pre-filled.
      </p>
    </form>
  );
}
