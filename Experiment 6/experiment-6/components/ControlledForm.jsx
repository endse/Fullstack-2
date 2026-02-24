'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Calendar, MessageSquare, Lock,
  ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck,
  Shield, ShieldAlert, Sparkles
} from 'lucide-react';

export default function ControlledForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    password: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Password Strength Logic
  const passwordStrength = useMemo(() => {
    if (!formData.password) return 0;
    let score = 0;
    if (formData.password.length > 8) score++;
    if (/[A-Z]/.test(formData.password)) score++;
    if (/[0-9]/.test(formData.password)) score++;
    if (/[^A-Za-z0-9]/.test(formData.password)) score++;
    return score;
  }, [formData.password]);

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (formData.firstName.length < 2) newErrors.firstName = 'First name too short';
      if (formData.lastName.length < 2) newErrors.lastName = 'Last name too short';
      if (!formData.dob) {
        newErrors.dob = 'Required';
      } else {
        const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
        if (age < 18) newErrors.dob = 'Must be 18+';
      }
    } else if (currentStep === 2) {
      if (formData.username.length < 3) newErrors.username = 'Username too short';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
      if (passwordStrength < 2) newErrors.password = 'Security too weak';
    } else if (currentStep === 3) {
      if (formData.message.trim().length < 5) newErrors.message = 'Write a longer message';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Future date guard with alert
    if (name === 'dob' && value) {
      if (new Date(value) > new Date()) {
        alert('Dates from the future are not allowed!');
        return;
      }
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleNext = () => {
    if (validateStep(step)) setStep(prev => prev + 1);
  };

  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsProcessing(true);
    // Mock API Lifecycle
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2500);
  };

  return (
    <>
      <div className="form-container">
        {isProcessing && (
          <div className="processing-overlay">
            <div className="spinner"></div>
            <p className="loading-text">SYNCING DATA...</p>
          </div>
        )}

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: '3rem 0' }}
          >
            <CheckCircle2 size={80} color="var(--success)" style={{ margin: '0 auto 1.5rem' }} />
            <h1>Mission Accomplished</h1>
            <p className="subtitle">Experiment 6 data has been validated and synced.</p>
            <button className="btn-secondary" onClick={() => window.location.reload()}>Reset Experiment</button>
          </motion.div>
        ) : (
          <>
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
              </div>
              {[1, 2, 3].map(i => (
                <div key={i} className={`step-node ${step === i ? 'active' : ''} ${step > i ? 'completed' : ''}`}>
                  {step > i ? <CheckCircle2 size={16} /> : i}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <div>
                    <h1>Profile Origin</h1>
                    <p className="subtitle">Personal identification markers</p>
                    <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label><User size={14} /> First Name</label>
                        <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" className={errors.firstName ? 'error' : ''} />
                      </div>
                      <div>
                        <label><User size={14} /> Last Name</label>
                        <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" className={errors.lastName ? 'error' : ''} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label><Calendar size={14} /> Origin Date (DoB)</label>
                      <input type="date" name="dob" value={formData.dob} onChange={handleChange} max={new Date().toISOString().split('T')[0]} className={errors.dob ? 'error' : ''} />
                      {errors.dob && <p className="error-message">{errors.dob}</p>}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h1>Security Uplink</h1>
                    <p className="subtitle">Account credentials and integrity</p>
                    <div className="form-group">
                      <label><Sparkles size={14} /> Unique Alias</label>
                      <input name="username" value={formData.username} onChange={handleChange} placeholder="cyber_ghost" className={errors.username ? 'error' : ''} />
                    </div>
                    <div className="form-group">
                      <label><Mail size={14} /> Transmission Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="relay@matrix.com" className={errors.email ? 'error' : ''} />
                    </div>
                    <div className="form-group">
                      <label><Lock size={14} /> Security Key</label>
                      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className={errors.password ? 'error' : ''} />
                      <div className="strength-container">
                        <div className="strength-bars">
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
                          {passwordStrength === 0 ? 'Empty' :
                            passwordStrength === 1 ? 'Vulnerable' :
                              passwordStrength === 2 ? 'Moderate' : 'Elite Security'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h1>Final Protocol</h1>
                    <p className="subtitle">Secure transmission message</p>
                    <div className="form-group">
                      <label><MessageSquare size={14} /> Payload Message</label>
                      <input name="message" value={formData.message} onChange={handleChange} placeholder="Enter secure payload..." className={errors.message ? 'error' : ''} />
                      {errors.message && <p className="error-message">{errors.message}</p>}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="btn-group">
              {step > 1 && <button className="btn-secondary" onClick={handleBack}><ArrowLeft size={18} /> Back</button>}
              {step < 3 ? (
                <button className="btn-primary" onClick={handleNext}>Continue <ArrowRight size={18} /></button>
              ) : (
                <button className="btn-primary" onClick={handleSubmit}><Sparkles size={18} /> Initiate Sync</button>
              )}
            </div>
          </>
        )}
      </div>

      <aside className="visualizer">
        <div className="avatar-circle">
          {formData.firstName ? formData.firstName[0].toUpperCase() : <User size={40} />}
        </div>
        <h2 className="preview-name">{formData.firstName || 'Unknown'} {formData.lastName || 'User'}</h2>
        <span className="preview-username">@{formData.username || 'ghost_node'}</span>

        <div className="preview-stats">
          <div className="stat-item">
            <span className="stat-label">System Age</span>
            <span className="stat-value">{formData.dob ? (new Date().getFullYear() - new Date(formData.dob).getFullYear()) : '??'} cycles</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Security Lvl</span>
            <span className="stat-value" style={{ color: passwordStrength >= 3 ? 'var(--success)' : '' }}>
              {passwordStrength >= 3 ? 'Class A' : 'Basic'}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Integrity</span>
            <span className="stat-value">{Object.keys(errors).length === 0 ? 'Verified' : 'Flagged'}</span>
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          {passwordStrength >= 3 && <ShieldCheck color="var(--success)" size={24} />}
          {formData.email && <Mail color="var(--primary)" size={24} />}
          {formData.dob && <Sparkles color="var(--accent)" size={24} />}
        </div>
      </aside>
    </>
  );
}
