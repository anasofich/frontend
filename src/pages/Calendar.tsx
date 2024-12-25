import React, { ChangeEvent, FormEvent, useState } from "react";

// Main Calendar Component
const Calendar: React.FC = () => {
  const [isAddActivityModalOpen, setAddActivityModalOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const openAddActivityModal = () => setAddActivityModalOpen(true);
  const closeAddActivityModal = () => setAddActivityModalOpen(false);

  const openConfirmationModal = () => setConfirmationModalOpen(true);
  const closeConfirmationModal = () => setConfirmationModalOpen(false);

  return (
    <div className="calendarTabContent">
      <div className="top">
        <div className="left">
          <h1>November 2024</h1>
          <div className="buttons">
            <button className="icon left">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.0529 2.14722C14.299 2.39335 14.4372 2.72713 14.4372 3.07516C14.4372 3.42319 14.299 3.75697 14.0529 4.0031L7.55607 10.5L14.0529 16.9968C14.292 17.2444 14.4243 17.5759 14.4213 17.9201C14.4183 18.2642 14.2803 18.5934 14.037 18.8367C13.7936 19.0801 13.4644 19.2181 13.1203 19.2211C12.7761 19.2241 12.4446 19.0918 12.1971 18.8527L4.77225 11.4279C4.5262 11.1818 4.38797 10.848 4.38797 10.5C4.38797 10.1519 4.5262 9.81817 4.77225 9.57204L12.1971 2.14722C12.4432 1.90117 12.777 1.76294 13.125 1.76294C13.473 1.76294 13.8068 1.90117 14.0529 2.14722Z"
                  fill="#2055F0"
                />
              </svg>
            </button>

            <button className="icon right">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.94706 18.8528C6.701 18.6066 6.56277 18.2729 6.56277 17.9248C6.56277 17.5768 6.701 17.243 6.94706 16.9969L13.4439 10.5L6.94706 4.00315C6.70797 3.75561 6.57568 3.42407 6.57867 3.07994C6.58166 2.7358 6.7197 2.40661 6.96305 2.16326C7.20639 1.91991 7.53558 1.78188 7.87972 1.77889C8.22385 1.7759 8.55539 1.90819 8.80293 2.14728L16.2277 9.57209C16.4738 9.81822 16.612 10.152 16.612 10.5C16.612 10.8481 16.4738 11.1818 16.2277 11.428L8.80293 18.8528C8.5568 19.0988 8.22302 19.2371 7.87499 19.2371C7.52697 19.2371 7.19319 19.0988 6.94706 18.8528Z"
                  fill="#DEE6FD"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="right">
          <button className="mainButton" onClick={openAddActivityModal}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.01 15.0002H17.5V3.33343C17.5 2.8914 17.3244 2.46747 17.0118 2.15491C16.6993 1.84234 16.2754 1.66675 15.8333 1.66675H5C3.995 1.66675 2.5 2.33259 2.5 4.16677V15.8335C2.5 17.6677 3.995 18.3336 5 18.3336H17.5V16.6669H5.01C4.625 16.6569 4.16667 16.5044 4.16667 15.8335C4.16667 15.1627 4.625 15.0102 5.01 15.0002ZM6.66667 5.00011H14.1667V6.6668H6.66667V5.00011Z"
                fill="white"
              />
            </svg>
            <h4>Add activity</h4>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 3.75L9 14.25ZM3.75 9L14.25 9Z" fill="white" />
              <path d="M9 3.75L9 14.25M3.75 9L14.25 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      {isAddActivityModalOpen && <AddActivityModal close={closeAddActivityModal} onSubmit={openConfirmationModal} />}
      {isConfirmationModalOpen && <ConfirmationModal close={closeConfirmationModal} />}
    </div>
  );
};

// Modal Component for Adding Activity
interface ActivityType {
  key: string;
  label: string;
  icon: string;
}

const ACTIVITY_TYPES: ActivityType[] = [
  { key: "food", label: "Food", icon: "media/graphics/svg/food.svg" },
  { key: "appointment", label: "Appointment", icon: "media/graphics/svg/appointment.svg" },
  { key: "blood-cell", label: "Blood cell", icon: "media/graphics/svg/blood-cell.svg" },
  { key: "glucose", label: "Glucose", icon: "media/graphics/svg/glucose.svg" },
  { key: "heart", label: "Heart", icon: "media/graphics/svg/heart.svg" },
  { key: "medicine", label: "Medicine", icon: "media/graphics/svg/medicine.svg" },
  { key: "toilet", label: "Bowel movement", icon: "media/graphics/svg/toilet.svg" },
  { key: "water", label: "Water", icon: "media/graphics/svg/water.svg" },
  { key: "weight", label: "Weight", icon: "media/graphics/svg/weight.svg" },
  { key: "exercise", label: "Exercise", icon: "media/graphics/svg/exercise.svg" },
];

const AddActivityModal: React.FC<{ close: () => void; onSubmit: () => void }> = ({ close, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    activityType: "",
    activityTitle: "",
    date: "",
    time: "",
    notes: "",
    status: "pending",
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleNext = () => {
    if (currentStep === 1 && formData.activityType) setCurrentStep(2);
  };

  const handleBack = () => setCurrentStep(1);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handle submit");
    console.log("formData", formData);
    onSubmit(); // Call parent function to open confirmation modal
    close(); // Close add activity modal
  };

  const areRequiredFieldsFilled = () => {
    return formData.activityType && formData.activityTitle && formData.date && formData.time;
  };

  return (
    <div className="addActivityModal">
      <div className="modalContent">
        <button className="rectangularButton close" onClick={close}>
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.8921 10.5L15.7886 6.60351C15.9735 6.41891 16.0775 6.16841 16.0777 5.90712C16.078 5.64582 15.9744 5.39514 15.7898 5.21021C15.6052 5.02529 15.3547 4.92127 15.0934 4.92104C14.8321 4.92081 14.5814 5.02438 14.3965 5.20898L10.5 9.10547L6.60351 5.20898C6.41859 5.02406 6.16777 4.92017 5.90625 4.92017C5.64472 4.92017 5.39391 5.02406 5.20898 5.20898C5.02406 5.39391 4.92017 5.64472 4.92017 5.90625C4.92017 6.16777 5.02406 6.41859 5.20898 6.60351L9.10547 10.5L5.20898 14.3965C5.02406 14.5814 4.92017 14.8322 4.92017 15.0937C4.92017 15.3553 5.02406 15.6061 5.20898 15.791C5.39391 15.9759 5.64472 16.0798 5.90625 16.0798C6.16777 16.0798 6.41859 15.9759 6.60351 15.791L10.5 11.8945L14.3965 15.791C14.5814 15.9759 14.8322 16.0798 15.0937 16.0798C15.3553 16.0798 15.6061 15.9759 15.791 15.791C15.9759 15.6061 16.0798 15.3553 16.0798 15.0937C16.0798 14.8322 15.9759 14.5814 15.791 14.3965L11.8921 10.5Z"
              fill="#202124"
            />
          </svg>
        </button>
        <form id="addActivityForm" onSubmit={handleFormSubmit}>
          {currentStep === 1 && (
            <div className="step1">
              <h3>What kind of activity do you want to add?</h3>
              <div className="activityTypes">
                {ACTIVITY_TYPES.map((type) => (
                  <button type="button" className={`activityType ${formData.activityType === type.key ? "selected" : ""}`} onClick={() => setFormData({ ...formData, activityType: type.key })}>
                    <div className="icon">
                      <img src={type.icon} alt={type.label} />
                    </div>
                    <h4>{type.label}</h4>
                  </button>
                ))}
              </div>
              {/* <div className="activityTypes">
                <button type="button" className={`activityType ${formData.activityType === "food" ? "selected" : ""}`} onClick={() => setFormData({ ...formData, activityType: "food" })}>
                  <div className="icon">
                    <img src="media/graphics/svg/food.svg" alt="icon" />
                  </div>
                  <h4>Food</h4>
                </button>
                <button type="button" className={`activityType ${formData.activityType === "appointment" ? "selected" : ""}`} onClick={() => setFormData({ ...formData, activityType: "appointment" })}>
                  <div className="icon">
                    <img src="media/graphics/svg/appointment.svg" alt="icon" />
                  </div>
                  <h4>Appointment</h4>
                </button>
              </div> */}
              <div className="buttons">
                <button type="button" className={`mainButton ${formData.activityType ? "" : "disabled"}`} onClick={handleNext}>
                  <h4>Next</h4>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.95463 1.8405C5.74372 2.05147 5.62524 2.33757 5.62524 2.63588C5.62524 2.93419 5.74372 3.22028 5.95463 3.43125L11.5234 9L5.95463 14.5688C5.7497 14.7809 5.63631 15.0651 5.63887 15.3601C5.64143 15.6551 5.75975 15.9372 5.96833 16.1458C6.17692 16.3544 6.45908 16.4727 6.75405 16.4753C7.04902 16.4778 7.3332 16.3644 7.54538 16.1595L13.9095 9.79538C14.1204 9.58441 14.2389 9.29831 14.2389 9C14.2389 8.70169 14.1204 8.4156 13.9095 8.20463L7.54538 1.8405C7.33441 1.6296 7.04831 1.51112 6.75 1.51112C6.45169 1.51112 6.1656 1.6296 5.95463 1.8405Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="step2">
              <div className="first">
                <h3>What’s the activity title?</h3>
                <input required type="text" name="activityTitle" placeholder="Write a title for your activity eg. appointment name, medicine name, etc." value={formData.activityTitle} onChange={handleInputChange} />
              </div>

              <div className="second">
                <div className="left">
                  <h3>Select date</h3>
                  <input required type="date" name="date" value={formData.date} onChange={handleInputChange} />
                </div>
                <div className="right">
                  <h3>Select time</h3>
                  <input required type="time" name="time" value={formData.time} onChange={handleInputChange} />
                </div>
              </div>

              <div className="third">
                <h3>Notes</h3>
                <textarea name="notes" placeholder="Include additional details, such as dosage instructions." value={formData.notes} onChange={handleInputChange} />
              </div>

              <div className="buttons">
                <button type="button" className="mainButton" onClick={handleBack}>
                  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.35 2.49159C14.2532 2.39459 14.1383 2.31762 14.0117 2.26511C13.8852 2.21259 13.7495 2.18556 13.6125 2.18556C13.4755 2.18556 13.3398 2.21259 13.2133 2.26511C13.0867 2.31762 12.9718 2.39459 12.875 2.49159L5.95 9.41666C5.87275 9.49376 5.81146 9.58533 5.76964 9.68614C5.72782 9.78695 5.7063 9.89502 5.7063 10.0042C5.7063 10.1133 5.72782 10.2214 5.76964 10.3222C5.81146 10.423 5.87275 10.5146 5.95 10.5917L12.875 17.5167C13.2833 17.9251 13.9417 17.9251 14.35 17.5167C14.7583 17.1084 14.7583 16.4501 14.35 16.0417L8.31667 10L14.3583 3.95827C14.7583 3.55827 14.7583 2.8916 14.35 2.49159Z"
                      fill="white"
                    />
                  </svg>

                  <h4>Back</h4>
                </button>
                <button type="submit" className={`mainButton ${areRequiredFieldsFilled() ? "" : "disabled"}`} disabled={!areRequiredFieldsFilled()}>
                  <h4>Save</h4>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 5.25L7.5 12.75L3.75 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// Confirmation Modal
const ConfirmationModal: React.FC<{ close: () => void }> = ({ close }) => (
  <div className="confirmationModal">
    <div className="modalContent">
      <h4>Request sent</h4>
      <p>A member of the staff will review your request</p>
      <button className="rectangularButton" onClick={close}>
        <h4>Close</h4>
        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.8921 11L15.7886 7.10351C15.9735 6.91891 16.0775 6.66841 16.0777 6.40712C16.078 6.14582 15.9744 5.89514 15.7898 5.71021C15.6052 5.52529 15.3547 5.42127 15.0934 5.42104C14.8321 5.42081 14.5814 5.52438 14.3965 5.70898L10.5 9.60547L6.60351 5.70898C6.41859 5.52406 6.16777 5.42017 5.90625 5.42017C5.64472 5.42017 5.39391 5.52406 5.20898 5.70898C5.02406 5.89391 4.92017 6.14472 4.92017 6.40625C4.92017 6.66777 5.02406 6.91859 5.20898 7.10351L9.10547 11L5.20898 14.8965C5.02406 15.0814 4.92017 15.3322 4.92017 15.5937C4.92017 15.8553 5.02406 16.1061 5.20898 16.291C5.39391 16.4759 5.64472 16.5798 5.90625 16.5798C6.16777 16.5798 6.41859 16.4759 6.60351 16.291L10.5 12.3945L14.3965 16.291C14.5814 16.4759 14.8322 16.5798 15.0937 16.5798C15.3553 16.5798 15.6061 16.4759 15.791 16.291C15.9759 16.1061 16.0798 15.8553 16.0798 15.5937C16.0798 15.3322 15.9759 15.0814 15.791 14.8965L11.8921 11Z"
            fill="#F59393"
          />
        </svg>
      </button>
    </div>
  </div>
);

export default Calendar;
