'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Calendar, MessageSquare, Lock,
  ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck,
  Sparkles
} from 'lucide-react';
import { validateForm, FormState, ValidationErrors } from '@/lib/validation';

export default function ControlledForm() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormState>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    password: '',
    message: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Password Strength Logic (Professional Meter)
  const passwordStrength = useMemo(() => {
    if (!formData.password) return 0;
    let score = 0;
    if (formData.password.length >= 10) score++; // Pro length
    if (/[A-Z]/.test(formData.password)) score++;
    if (/[0-9]/.test(formData.password)) score++;
    if (/[^A-Za-z0-9]/.test(formData.password)) score++;
    return score;
  }, [formData.password]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Future date guard with interactive feedback
    if (name === 'dob' && value) {
      const selected = new Date(value);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      if (selected > now) {
        alert('Temporal anomaly detected: Date of birth cannot be in the future.');
        return;
      }
    }

    setFormData(prev => ({ ...prev, [name]: value }));

    // Pro-active error clearing
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }, [errors]);

  const handleNext = () => {
    const stepErrors = validateForm(formData, step, passwordStrength);
    if (Object.keys(stepErrors).length === 0) {
      setStep(prev => prev + 1);
    } else {
      setErrors(stepErrors);
    }
  };

  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalErrors = validateForm(formData, 3, passwordStrength);

    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      return;
    }

    setIsProcessing(true);
    // Standard Enterprise Latency Simulation
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      console.log('Professional Submission Success:', formData);
    }, 2800);
  };

  return (
    <>
      <div className="form-container" role="main" aria-labelledby="form-title">
        {isProcessing && (
          <div className="processing-overlay" role="alert" aria-busy="true">
            <div className="spinner"></div>
            <p className="loading-text">ENCRYPTING DATA PROTOCOL...</p>
          </div>
        )}

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', padding: '3rem 0' }}
          >
            <CheckCircle2 size={80} color="var(--success)" style={{ margin: '0 auto 1.5rem' }} />
            <h1 id="form-title">Protocol Verified</h1>
            <p className="subtitle">Enterprise state has been synchronized across all nodes.</p>
            <button className="btn-secondary" onClick={() => window.location.reload()}>Re-initialize</button>
          </motion.div>
        ) : (
          <>
            <div className="progress-container" aria-label="Progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
              </div>
              {[1, 2, 3].map(i => (
                <div key={i} className={`step-node ${step === i ? 'active' : ''} ${step > i ? 'completed' : ''}`} aria-current={step === i ? 'step' : undefined}>
                  {step > i ? <CheckCircle2 size={16} /> : i}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -30, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {step === 1 && (
                  <section aria-labelledby="step-1-title">
                    <h1 id="step-1-title">Global Identity</h1>
                    <p className="subtitle">Identification logic for system entry</p>
                    <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label htmlFor="firstName"><User size={14} /> First Name</label>
                        <input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Etienne"
                          aria-invalid={!!errors.firstName}
                          className={errors.firstName ? 'error' : ''}
                        />
                        {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label htmlFor="lastName"><User size={14} /> Last Name</label>
                        <input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="O'Connor"
                          aria-invalid={!!errors.lastName}
                          className={errors.lastName ? 'error' : ''}
                        />
                        {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="dob"><Calendar size={14} /> Date of Birth (Age Gate)</label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        max={new Date().toISOString().split('T')[0]}
                        aria-invalid={!!errors.dob}
                        className={errors.dob ? 'error' : ''}
                      />
                      {errors.dob && <p className="error-message">{errors.dob}</p>}
                    </div>
                  </section>
                )}

                {step === 2 && (
                  <section aria-labelledby="step-2-title">
                    <h1 id="step-2-title">Access Credentials</h1>
                    <p className="subtitle">Security parameters and transmission relay</p>
                    <div className="form-group">
                      <label htmlFor="username"><Sparkles size={14} /> System Alias</label>
                      <input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="admin_sys_01"
                        aria-invalid={!!errors.username}
                        className={errors.username ? 'error' : ''}
                      />
                      {errors.username && <p className="error-message">{errors.username}</p>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email"><Mail size={14} /> Relay Endpoint</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="relay@cuchd.in"
                        aria-invalid={!!errors.email}
                        className={errors.email ? 'error' : ''}
                      />
                      {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="password"><Lock size={14} /> Encryption Key</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••••••"
                        aria-invalid={!!errors.password}
                        className={errors.password ? 'error' : ''}
                      />
                      <div className="strength-container">
                        <div className="strength-bars" role="progressbar" aria-valuenow={passwordStrength} aria-valuemin={0} aria-valuemax={4}>
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className="strength-bar"
                              style={{
                                background: i <= passwordStrength ?
                                  (passwordStrength <= 1 ? 'var(--error)' :
                                    passwordStrength <= 2 ? 'var(--warning)' : 'var(--success)') : ''
                              }}
                            ></div>
                          ))}
                        </div>
                        <span className="strength-label">
                          Security Level: {
                            passwordStrength === 0 ? 'Exposed' :
                              passwordStrength === 1 ? 'Standard' :
                                passwordStrength === 2 ? 'Insecure' :
                                  passwordStrength === 3 ? 'Secure' : 'Elite'
                          }
                        </span>
                      </div>
                      {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>
                  </section>
                )}

                {step === 3 && (
                  <section aria-labelledby="step-3-title">
                    <h1 id="step-3-title">Payload Sync</h1>
                    <p className="subtitle">Final transmission directives</p>
                    <div className="form-group">
                      <label htmlFor="message"><MessageSquare size={14} /> Encrypted Payload</label>
                      <input
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Initialize transmission..."
                        aria-invalid={!!errors.message}
                        className={errors.message ? 'error' : ''}
                      />
                      {errors.message && <p className="error-message">{errors.message}</p>}
                    </div>
                  </section>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="btn-group">
              {step > 1 && <button className="btn-secondary" onClick={handleBack} type="button"><ArrowLeft size={18} /> Back</button>}
              {step < 3 ? (
                <button className="btn-primary" onClick={handleNext} type="button">Next Protocol <ArrowRight size={18} /></button>
              ) : (
                <button className="btn-primary" onClick={handleSubmit} type="submit"><Sparkles size={18} /> Sync All Nodes</button>
              )}
            </div>
          </>
        )}
      </div>

      <aside className="visualizer" aria-label="Identity Preview">
        <div className="avatar-circle">
          {formData.firstName ? formData.firstName[0].toUpperCase() : <User size={40} />}
        </div>
        <h2 className="preview-name">{formData.firstName || 'Node'} {formData.lastName || 'Guest'}</h2>
        <span className="preview-username">@{formData.username || 'unknown_node'}</span>

        <div className="preview-stats">
          <div className="stat-item">
            <span className="stat-label">Registry Era</span>
            <span className="stat-value">{formData.dob ? (new Date().getFullYear() - new Date(formData.dob).getFullYear()) : '--'} cycles</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Access Tiers</span>
            <span className="stat-value" style={{ color: passwordStrength >= 3 ? 'var(--success)' : '' }}>
              {passwordStrength >= 4 ? 'Level 5 (Root)' : passwordStrength >= 3 ? 'Level 3 (Secured)' : 'Level 1 (Basic)'}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Data Integrity</span>
            <span className="stat-value">{Object.keys(errors).length === 0 ? 'Pristine' : 'Compromised'}</span>
          </div>
        </div>
      </aside>
    </>
  );
}
