'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { ProgressBar, Step } from '@/components/ui/ProgressBar';
import { FcInfo } from 'react-icons/fc';
import { GiCheckMark } from 'react-icons/gi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/* ---------------- DATA ---------------- */

interface Concern {
  title: string;
  amount?: number;
}

const concerns: Concern[] = [
  { title: 'Skin and hair' },
  { title: 'Mom and child health' },
  { title: 'General wellness' },
  { title: 'Nutrition' },
  { title: 'Medical reports opinion' },
  { title: 'Healthy living' },
  { title: 'Mother and Child Counselling - 1 Session', amount: 1099 },
  { title: 'Mental Health Care - 2 Sessions', amount: 1999 },
  { title: 'Mental Health Care - 3 Sessions', amount: 3099 },
  { title: 'Mental Health Care - 5 Sessions', amount: 5099 },
  { title: 'Physical Health - 3 Sessions', amount: 1299 },
  { title: 'Skin and Hair - 4 Appointments', amount: 1099 },
];

const inputClass =
  'block w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-700 transition focus:ring-2 focus:ring-primary-green focus:outline-none';

/* ---------------- PAGE ---------------- */

export default function AppointmentPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const steps = [1, 2, 3, 4];

  /* FORM STATE */
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [concern, setConcern] = useState('');
  const [userConcern, setUserConcern] = useState('');

  // NEW: Prescription Upload
  const [prescriptionFiles, setPrescriptionFiles] = useState<FileList | null>(null);

  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [eventInfo, setEventInfo] = useState<any>(null);

  const [video] = useState(true);
  const [newUser] = useState(true);

  const [amount, setAmount] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  /* ---------------- HELPERS ---------------- */

  const calcAge = (dob: string) => {
    const birth = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
    ) {
      years--;
    }
    return years;
  };

  useEffect(() => {
    if (dob) setAge(calcAge(dob));
  }, [dob]);

  const baseAmount = () => {
    const c = concerns.find((x) => x.title === concern);
    if (c?.amount) return c.amount;
    return newUser && video ? 399 : 199;
  };

  useEffect(() => {
    setAmount(baseAmount());
  }, [concern]);

  /* ---------------- ACTIONS ---------------- */

  const checkUserInDb = () => {
    if (phone.length === 10) setStep(2);
  };

  const handleTimeSelect = (date: Date) => {
    setDateTime(date);
    setEventInfo({
      startTime: date,
      meetingLink: `https://meet.carenest.in/${Math.random().toString(36).slice(2)}`,
    });
    setModalOpen(false);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dob || !gender || !concern || !dateTime) {
      alert('Please complete all required fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('gender', gender);
      formData.append('dob', dob);
      formData.append('concern', concern);
      formData.append('notes', userConcern);
      formData.append('appointment_time', dateTime.toISOString());
      formData.append('meeting_link', eventInfo?.meetingLink || '');
      formData.append('amount', amount.toString());


      // Require prescription upload
      if (!prescriptionFiles || prescriptionFiles.length === 0) {
        alert('Please upload at least one prescription file.');
        return;
      }
      for (let i = 0; i < prescriptionFiles.length; i++) {
        formData.append('prescriptions', prescriptionFiles[i]);
      }

      const res = await fetch('/api/appointments', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setShowResponse(true);
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data?.error || 'Failed to book appointment. Please try again.');
      }
    } catch (err) {
      alert('An error occurred while booking appointment.');
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-50 py-10">

      {/* HEADER */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="text-2xl font-bold">Book an Appointment</h2>
        <p className="text-sm text-gray-600 mt-2">
          Answer a few questions to schedule your consultation
        </p>
      </div>

      {/* PROGRESS */}
      <div className="max-w-xl mx-auto">
        <ProgressBar percent={(step - 1) * 33}>
          {steps.map((_, i) => (
            <Step key={i}>
              {() => (
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold
                  ${step >= i + 1 ? 'bg-primary-red text-white' : 'bg-gray-300 text-gray-600'}`}
                >
                  {i + 1}
                </div>
              )}
            </Step>
          ))}
        </ProgressBar>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl max-w-3xl mx-auto mt-10 p-6 md:p-10"
      >

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-6 text-center">
            <label className="font-bold">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`${inputClass} max-w-sm mx-auto`}
              placeholder="10-digit mobile number"
            />
            <button
              type="button"
              onClick={checkUserInDb}
              disabled={phone.length !== 10}
              className="bg-primary-green text-white px-8 py-2 rounded-lg font-semibold disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-bold">Name</label>
                <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="font-bold">Date of Birth</label>
                <input type="date" className={inputClass} value={dob} onChange={(e) => setDob(e.target.value)} />
              </div>
              <div>
                <label className="font-bold">Gender</label>
                <select className={inputClass} value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div>
                <label className="font-bold">Email (optional)</label>
                <input className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button type="button" onClick={() => setStep(1)} className="text-primary-green font-bold">
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={!name || !dob || !gender}
                className="bg-primary-green text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div className="space-y-6">

              <div>
                <label className="font-bold">Select Your Concern</label>
                <select className={inputClass} value={concern} onChange={(e) => setConcern(e.target.value)}>
                  <option value="">Choose</option>
                  {concerns.map((c) => (
                    <option key={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              {/* Prescription Upload */}
              <div>
                <label className="font-bold flex items-center gap-2">
                  Upload your prescription <span className="text-red-500">*</span>
                  <FcInfo title="Upload medical prescription or report" />
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  className={inputClass}
                  onChange={(e) => setPrescriptionFiles(e.target.files)}
                  required
                />
                {prescriptionFiles && (
                  <p className="text-sm text-gray-500 mt-1">
                    {prescriptionFiles.length} file(s) selected
                  </p>
                )}
              </div>

              <div>
                <label className="font-bold">Additional notes (optional)</label>
                <textarea
                  rows={4}
                  className={inputClass}
                  value={userConcern}
                  onChange={(e) => setUserConcern(e.target.value)}
                />
              </div>

            </div>

            <div className="flex justify-between mt-10">
              <button type="button" onClick={() => setStep(2)} className="text-primary-green font-bold">
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                disabled={!concern}
                className="bg-primary-green text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <div className="text-center space-y-4">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="bg-primary-green text-white px-6 py-2 rounded-lg font-semibold"
              >
                Select Time Slot
              </button>
              <p className="text-sm text-gray-600">
                {dateTime ? dateTime.toLocaleString() : 'No slot selected'}
              </p>
              <p className="text-xl font-bold text-primary-red">₹ {amount}</p>
            </div>

            <div className="flex justify-between mt-8">
              <button type="button" onClick={() => setStep(3)} className="text-primary-green font-bold">
                Back
              </button>
              <button type="submit" className="bg-primary-red text-white px-6 py-2 rounded-lg font-bold">
                Confirm Appointment
              </button>
            </div>
          </>
        )}
      </form>

      {/* TIME MODAL */}
      <Modal modalOpen={modalOpen} setOpenModal={setModalOpen}>
        <div className="bg-white p-6 rounded-xl">
          <h3 className="font-bold mb-4">Choose a Time</h3>
          {Array.from({ length: 5 }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() + i + 1);
            d.setHours(10, 0, 0, 0);
            return (
              <button
                key={i}
                onClick={() => handleTimeSelect(d)}
                className="block w-full mb-2 px-4 py-2 border rounded hover:bg-primary-green hover:text-white"
              >
                {d.toLocaleString()}
              </button>
            );
          })}
        </div>
      </Modal>

      {/* SUCCESS MODAL */}
      <Modal modalOpen={showResponse} setOpenModal={() => router.push('/')}>
        <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-auto">
          <GiCheckMark size={60} className="mx-auto text-green-500 mb-4" />
          <h3 className="text-2xl font-bold">Appointment Confirmed!</h3>
          <p className="text-gray-600 mt-2">
            Your consultation is scheduled successfully.
          </p>

          <div className="bg-gray-50 rounded-xl p-4 mt-6 text-left">
            <p className="text-sm">
              <b>Date & Time:</b><br />
              {eventInfo?.startTime && new Date(eventInfo.startTime).toLocaleString()}
            </p>
            <p className="text-sm mt-3 break-all">
              <b>Meeting Link:</b><br />
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(eventInfo?.meetingLink);
                  alert('Meeting link copied!');
                }}
              >
                {eventInfo?.meetingLink}
              </span>
            </p>
          </div>

          <button
            onClick={() => router.push('/')}
            className="mt-6 px-6 py-2 rounded-lg bg-primary-green text-white font-semibold"
          >
            Go Home
          </button>
        </div>
      </Modal>
    </div>
  );
}
