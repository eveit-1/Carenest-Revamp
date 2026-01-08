'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '@/components/ui/Modal';
import { ProgressBar, Step } from '@/components/ui/ProgressBar';
import { FcInfo } from 'react-icons/fc';
import { GiCheckMark } from 'react-icons/gi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  'block w-full px-4 py-2 rounded-md border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-primary-green focus:outline-none disabled:bg-gray-200/80';

export default function AppointmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [percentage, setPercentage] = useState<number | undefined>(undefined);
  const [disabled, setDisabled] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [referdiv, setReferdiv] = useState(false);
  const [parentsPerms, setParentsPerms] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState<number | string>('');
  const [guardian, setGuardian] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [concern, setConcern] = useState('');
  const [userConcern, setUserConcern] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [video, setVideo] = useState(true);
  const [friendName, setFriendName] = useState('');
  const [friendNumber, setFriendNumber] = useState('');
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [eventInfo, setEventInfo] = useState<any>(null);
  const [newUser, setNewUser] = useState(true);
  const [couponcode, setCouponcode] = useState('');
  const [coupondata, setCoupondata] = useState<any>({});
  const [amount, setAmount] = useState<number>(0);

  const steps = Array(4).fill(0);

  // Calculate age from DOB
  const calcAge = (dob: string): number => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      years--;
    }
    return years;
  };

  // Update age when DOB changes
  useEffect(() => {
    if (dob) {
      const calculatedAge = calcAge(dob);
      setAge(calculatedAge);
    }
  }, [dob]);

  // Calculate amount based on concern and user type
  const getAmount = (): number => {
    const concernObj = concerns.find((x) => x.title === concern);
    if (concernObj?.amount) {
      return concernObj.amount;
    }
    return newUser && video ? 399 : 199;
  };

  // Update amount when dependencies change
  useEffect(() => {
    if (coupondata?.Amount !== undefined) {
      setAmount(coupondata.Amount);
    } else {
      setAmount(getAmount());
    }
  }, [video, newUser, coupondata, concern]);

  // Update progress percentage
  useEffect(() => {
    const trueAge = ((typeof age === 'number' && age < 18 && parentsPerms) || (typeof age === 'number' && age >= 18));
    if (phone && phone.length === 10) setPercentage(1);
    if (name && dob && gender && phone && trueAge)
      setPercentage((100 / (steps.length - 1)) * 1);
    if (name && dob && trueAge && gender && phone && concern)
      setPercentage((100 / (steps.length - 1)) * 2);
    if (name && dob && trueAge && gender && phone && concern && dateTime)
      setPercentage((100 / (steps.length - 1)) * 3);
  }, [name, dob, age, guardian, gender, phone, concern, dateTime, parentsPerms, steps.length]);

  // Check if user exists in database
  const checkUserInDb = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    try {
      if (phone.length === 10) {
        // Simulate API call - in real app, fetch from API
        // For now, treat as new user
        setNewUser(true);
        setDisabled(false);
        setStep(2);
        setCoupondata({});
        setCouponcode('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Handle time selection
  const handleTimeSelect = (selectedDate: Date) => {
    setDateTime(selectedDate);
    setModalOpen(false);
    // Create mock event info
    setEventInfo({
      startTime: selectedDate,
      meetingLink: `https://meet.carenest.in/${Math.random().toString(36).substring(7)}`,
    });
  };

  // Apply coupon
  const applycoupon = () => {
    // Simulate coupon application
    if (couponcode.toLowerCase() === 'test') {
      setCoupondata({ value: 50, type: 'percentage' });
    } else {
      setCoupondata({});
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trueAge = (typeof age === 'number' && age < 18 && parentsPerms) || (typeof age === 'number' && age >= 18);

    if (!name || !dob || !gender || !phone || !concern || !dateTime || !trueAge) {
      alert('Please fill all required fields.');
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowResponse(true);
  };

  // Copy event details
  const copyEvent = () => {
    if (eventInfo) {
      navigator.clipboard.writeText(
        `Consultation meeting scheduled with Carenest!\n\nDate/Time: ${new Date(eventInfo.startTime).toLocaleString()}\n\nMeeting Link: ${eventInfo?.meetingLink}`
      );
      alert('Event details copied to clipboard!');
    }
  };

  // Render step content
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="w-full">
            <div className="flex flex-col items-center justify-center w-full mb-2">
              <label htmlFor="phone" className="font-bold text-gray-700 mb-7">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`lg:w-4/12 mb-7 ${inputClass}`}
                placeholder="Enter your phone number"
                required
              />
              <input
                type="button"
                onClick={checkUserInDb}
                className="px-6 py-2 bg-primary-green border-2 border-primary-green disabled:bg-[#b6d8b5] cursor-pointer disabled:cursor-not-allowed rounded text-white font-bold"
                disabled={!phone || phone.length !== 10}
                value="Submit"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="w-full">
            <div className="flex flex-col md:flex-row w-full md:space-x-10 space-y-6 md:space-y-0 mb-6">
              <div className="space-y-2 mb-2 w-full md:w-1/2">
                <label htmlFor="name" className="font-bold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  autoFocus={true}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  disabled={disabled}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="space-y-2 mb-2 w-full md:w-1/2">
                <label htmlFor="dob" className="font-bold text-gray-700">
                  Date Of Birth
                  {age ? <small className="font-normal"> (Age: {age} years)</small> : null}
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className={inputClass}
                  disabled={disabled}
                  required
                />
                {typeof age === 'number' && age < 18 ? (
                  <div className="mb-4 mt-2 flex">
                    <input
                      type="checkbox"
                      checked={parentsPerms}
                      onChange={() => setParentsPerms(!parentsPerms)}
                      id="parentsConcern"
                      className="form-check-input h-4 w-4 cursor-pointer mr-2 mt-1"
                    />
                    <label className="form-check-label inline-block text-gray-800 cursor-pointer" htmlFor="parentsConcern">
                      I&apos;ve consent of my parents/guardians.
                    </label>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col md:flex-row w-full md:space-x-10 space-y-6 md:space-y-0 mb-6">
              {typeof age === 'number' && age < 18 ? (
                <div className="space-y-2 mb-2 w-full md:w-1/2">
                  <label htmlFor="guardian" className="font-bold text-gray-700">
                    Parents/Guardians Name
                  </label>
                  <input
                    type="text"
                    name="guardian"
                    id="guardian"
                    value={guardian}
                    onChange={(e) => setGuardian(e.target.value)}
                    className={inputClass}
                    disabled={disabled}
                    placeholder="Enter your parents name"
                  />
                </div>
              ) : null}
              <div className="space-y-2 mb-2 w-full md:w-1/2">
                <label htmlFor="gender" className="font-bold text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  disabled={disabled}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="space-y-2 mb-2 w-full md:w-1/2 mx-auto">
              <label htmlFor="email" className="font-bold text-gray-700">
                Email (Optional)
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                disabled={disabled}
                placeholder="Enter your email"
              />
            </div>
            <div className="max-w-max mx-auto space-x-7 flex items-center justify-center mt-8 mb-14">
              <input
                type="button"
                onClick={() => setStep(1)}
                className="mx-auto px-6 py-2 border-2 border-primary-green text-primary-green disabled:bg-[#b6d8b5] cursor-pointer disabled:cursor-not-allowed rounded font-bold"
                value="Back"
              />
              <input
                type="button"
                onClick={() => setStep(3)}
                className="mx-auto px-6 py-2 bg-primary-green border-2 border-primary-green disabled:bg-[#b6d8b5] cursor-pointer disabled:cursor-not-allowed rounded text-white font-bold"
                value="Submit"
                disabled={
                  !name ||
                  !dob ||
                  !gender ||
                  !((typeof age === 'number' && age < 18 && parentsPerms) || (typeof age === 'number' && age >= 18))
                }
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full">
            <div className="flex lg:flex-row flex-col lg:space-x-10 w-full">
              <div className="w-full md:w-1/2">
                <div className="space-y-2 mb-2">
                  <label htmlFor="concern" className="font-bold text-gray-700">
                    Select Your Concern
                  </label>
                  <select
                    name="concern"
                    id="concern"
                    autoFocus={true}
                    value={concern}
                    onChange={(e) => setConcern(e.target.value)}
                    className={inputClass}
                    required
                  >
                    <option value="">Select your concern</option>
                    {concerns.map((x, i) => (
                      <option key={'concern' + i} value={x.title}>
                        {x.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2 mb-2 mt-4">
                  <label htmlFor="files" className="font-bold text-gray-700 relative">
                    Upload images{' '}
                    {['Skin and hair', 'Medical reports opinion'].includes(concern)
                      ? '(Required)'
                      : '(Optional)'}
                    <span className="absolute top-0 -right-7 cursor-pointer">
                      <span title="You can select multiples here.">
                        <FcInfo size={20} />
                      </span>
                    </span>
                  </label>
                  <input
                    type="file"
                    multiple={true}
                    name="files"
                    className={inputClass}
                    onChange={(e) => setFiles(e.target.files)}
                    required={['Skin and hair', 'Medical reports opinion'].includes(concern)}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="space-y-2 mb-2">
                  <label htmlFor="userConcern" className="font-bold text-gray-700">
                    Type your concern here (Optional)
                  </label>
                  <textarea
                    rows={5}
                    value={userConcern}
                    onChange={(e) => setUserConcern(e.target.value)}
                    className={inputClass}
                    placeholder="Type your concern here"
                  />
                </div>
              </div>
            </div>
            <div className="max-w-max mx-auto space-x-7 flex items-center justify-center mt-8 mb-14">
              <input
                type="button"
                onClick={() => setStep(2)}
                className="mx-auto px-6 py-2 border-2 border-primary-green text-primary-green disabled:bg-[#b6d8b5] cursor-pointer disabled:cursor-not-allowed rounded font-bold"
                value="Back"
              />
              <input
                type="button"
                onClick={() => setStep(4)}
                className="mx-auto px-6 py-2 bg-primary-green border-2 border-primary-green disabled:bg-[#b6d8b5] cursor-pointer disabled:cursor-not-allowed rounded text-white font-bold"
                value="Submit"
                disabled={
                  !name ||
                  !dob ||
                  !gender ||
                  !((typeof age === 'number' && age < 18 && guardian && parentsPerms) ||
                    (typeof age === 'number' && age >= 18)) ||
                  !concern ||
                  (['Skin and hair', 'Medical reports opinion'].includes(concern) && (!files || files.length === 0))
                }
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="w-full flex flex-col items-center justify-center">
            <div className="flex space-x-10">
              <div className="space-y-2 mb-6">
                <h2 className="font-bold text-gray-700 relative mb-3 text-center">
                  Consultation Type
                </h2>
                <div className="w-full flex justify-center items-center">
                  <input type="radio" id="video" name="type" checked={video} className="hidden" />
                  <label
                    htmlFor="video"
                    onClick={() => setVideo(true)}
                    className={`mx-auto font-bold text-gray-700 px-4 py-1 border rounded cursor-pointer ${
                      video && 'bg-primary-red text-white'
                    }`}
                  >
                    Video
                  </label>
                </div>
              </div>

              <div className="text-center">
                <label htmlFor="timeSlot" className="font-bold text-gray-700">
                  Pick a 20 minute time slot
                </label>
                <div className="w-full flex items-center mt-3">
                  <input
                    type="button"
                    id="submitBtn"
                    value="Select time"
                    onClick={() => setModalOpen(true)}
                    autoFocus={true}
                    className="px-8 py-[6px] rounded-xl md:w-40 cursor-pointer bg-primary-green border-2 border-primary-green text-white font-semibold shadow-xl outline-none focus:border-2 focus:border-primary-red"
                  />
                  <p className="w-full mt-2">
                    {dateTime || eventInfo
                      ? new Date(eventInfo?.startTime || dateTime || new Date()).toLocaleString()
                      : 'Time not selected'}
                    {eventInfo ? (
                      <>
                        <br />
                        <span>Meeting Link: {eventInfo?.meetingLink}</span>
                      </>
                    ) : null}
                  </p>
                  <Modal modalOpen={modalOpen} setOpenModal={setModalOpen}>
                    <div className="bg-white p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-4">Select Time Slot</h3>
                      <div className="space-y-2">
                        {Array.from({ length: 7 }, (_, i) => {
                          const date = new Date();
                          date.setDate(date.getDate() + i + 1);
                          date.setHours(9, 0, 0, 0);
                          return (
                            <button
                              key={i}
                              onClick={() => handleTimeSelect(date)}
                              className="w-full px-4 py-2 border rounded hover:bg-primary-green hover:text-white"
                            >
                              {date.toLocaleString()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>

            <div
              id="coupon-sec"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '40px',
                gap: '20px',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: '800' }}>Apply Coupon</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <input
                  onChange={(e) => setCouponcode(e.target.value)}
                  value={couponcode}
                  style={{
                    outline: 'none',
                    border: '1px solid #E94C60',
                    padding: '10px',
                    width: '20vw',
                    borderRadius: '10px',
                  }}
                  type="text"
                  placeholder="Enter your coupon code here"
                />
                <input
                  type="button"
                  className="px-7 py-2 bg-primary-red rounded text-white font-bold cursor-pointer"
                  onClick={applycoupon}
                  value="Apply"
                />
              </div>
              <h3 className="text-lg lg:-mt-2">
                Amount: <span className="font-bold">{getAmount()}</span> |{' '}
                {coupondata && (
                  <>
                    Discount:{' '}
                    <span className="font-bold">
                      {coupondata.value || 0}
                      {coupondata?.type === 'percentage' ? '%' : ''}
                    </span>
                  </>
                )}{' '}
                | Total:{' '}
                <span className="font-bold text-primary-red">{Math.round(amount)}</span>
              </h3>
            </div>
            <div className="w-full lg:w-1/2 mx-auto flex justify-center">
              <div className="">
                <p
                  className="underline text-gray-700 font-bold text-lg mt-1 lg:mt-4 mb-3 cursor-pointer"
                  onClick={() => setReferdiv(!referdiv)}
                >
                  Refer a friend
                </p>
              </div>
              {referdiv ? (
                <div
                  className={`space-y-2 mb-2 mx-auto py-4 px-4 rounded-lg w-60 h-44 relative shadow-lg ${
                    referdiv ? 'block' : 'hidden'
                  }`}
                >
                  <p
                    className="absolute top-3 right-3 w-4 h-4 cursor-pointer rounded-full text-center shadow-lg shadow-slate-300 flex justify-center items-center"
                    onClick={() => setReferdiv(false)}
                  >
                    x
                  </p>
                  <div className="mb-2">
                    <label htmlFor="friendName" className="text-md font-bold text-gray-700">
                      Friend Name
                    </label>
                    <input
                      type="text"
                      name="friendName"
                      id="friendName"
                      value={friendName}
                      onChange={(e) => setFriendName(e.target.value)}
                      className={inputClass}
                      placeholder="Enter your friend's name"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="friendNumber" className="text-md font-bold text-gray-700">
                      Friend Phone Number
                    </label>
                    <input
                      type="tel"
                      name="friendNumber"
                      id="friendNumber"
                      value={friendNumber}
                      onChange={(e) => setFriendNumber(e.target.value)}
                      className={inputClass}
                      placeholder="Enter your friend's number"
                    />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mb-4 mt-5 flex">
              <input
                type="checkbox"
                required
                id="terms&conditionsconcern"
                className="form-check-input h-4 w-4 cursor-pointer mr-2 mt-1"
              />
              <label className="form-check-label inline-block text-gray-800 cursor-pointer" htmlFor="terms&conditionsconcern">
                I agree to{' '}
                <span className="text-blue-500 underline">
                  <Link href="/terms&conditions" target="_blank" rel="noopener noreferrer">
                    terms and conditions.
                  </Link>
                </span>
              </label>
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="max-w-max mx-auto mt-6 flex justify-center space-x-10">
                <input
                  type="button"
                  onClick={() => setStep(3)}
                  className="mx-auto px-6 py-2 border-2 border-primary-green text-primary-green disabled:bg-[#b6d8b5] cursor-pointer disabled:cursor-not-allowed rounded font-bold"
                  value="Back"
                />
                <button type="submit" className="px-7 py-2 bg-primary-red rounded text-white font-bold">
                  Submit
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return <></>;
    }
  };

  return (
    <div className="App">
      {/* Header Section */}
      <div className="text-center mx-auto px-10 lg:px-20 mt-10 mb-4 w-full md:w-[45%]">
        <h2 className="text-xl font-semibold my-4">Get started with a few simple questions:</h2>
        <p className="text-sm font-medium">
          One of the best things you can do for your health is to begin with us.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="right w-10/12 lg:px-20 lg:w-6/12 px-3 mx-auto mt-10">
        <ProgressBar percent={percentage || 0}>
          {steps.map((x, i) => {
            const stepPercent = (100 / (steps.length - 1)) * i;
            const accomplished = percentage !== undefined && percentage >= stepPercent;
            return (
              <Step key={'step' + i}>
                {() => (
                  <div
                    onClick={() => setStep(i + 1)}
                    className={`rounded-full w-10 h-10 flex justify-center items-center font-semibold cursor-pointer ${
                      accomplished
                        ? 'bg-primary-red text-gray-200'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                  >
                    {i + 1}
                  </div>
                )}
              </Step>
            );
          })}
        </ProgressBar>

        {/* Form */}
        <div className="mt-20">
          <form className="my-10 w-full" onSubmit={handleSubmit}>
            <div className="md:min-h-[50vh]">{renderStep()}</div>
          </form>

          {/* Success Modal */}
          <Modal modalOpen={showResponse} setOpenModal={() => router.push('/')}>
            <div className="flex flex-col items-center justify-center w-full lg:w-1/2 py-10 px-5 bg-white mx-auto relative">
              <span
                onClick={() => {
                  if (window.confirm('Have you saved event details?')) router.push('/');
                }}
                className="absolute right-3 top-3 cursor-pointer font-bold text-lg rounded-full border border-gray-600 w-6 h-6 flex items-center justify-center"
              >
                x
              </span>
              <GiCheckMark className="fill-green-500" size={50} />
              <br />
              <h3 className="text-lg">
                Your appointment with <b className="text-primary-red">Carenest</b> is scheduled
                successfully!
              </h3>
              <br />
              <span className="text-sm">
                <small>Click below link to copy:</small>
              </span>
              <h2 className="text-lg font-bold">
                Meeting Link:{' '}
                <span className="text-blue-500 cursor-pointer" onClick={copyEvent}>
                  {eventInfo?.meetingLink}
                </span>
              </h2>
              <span className="mt-2 text-sm font-semibold text-gray-600">
                NOTE: Save this link somewhere for future use. Do not lose it.
              </span>
            </div>
          </Modal>
        </div>
        <p className="text-sm -mt-5 font-bold md:w-2/4">
          Note: In case of any issue, mail us at contact@carenest.in
        </p>
      </div>
    </div>
  );
}
