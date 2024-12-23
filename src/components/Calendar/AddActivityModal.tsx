import React, { useState } from "react";

interface AddActivityModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

const AddActivityModal: React.FC<AddActivityModalProps> = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleTypeSelection = (type: string) => setSelectedType(type);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isStep2Valid = formData.title.trim() !== "" && formData.date.trim() !== "" && formData.time.trim() !== "";

  const nextStep = () => {
    if (selectedType) setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isStep2Valid) {
      onSubmit();
      onClose();
    }
  };

  return (
    <div className="addActivityModal">
      <div className="modalContent">
        <button className="icon close" onClick={onClose}>
          ×
        </button>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="step1">
              <h3>What kind of activity do you want to add?</h3>
              <div className="activityTypes">
                {["Food", "Appointment"].map((type) => (
                  <button key={type} type="button" className={`activityType ${selectedType === type ? "selected" : ""}`} onClick={() => handleTypeSelection(type)}>
                    <div className="icon">
                      <img src={`media/graphics/svg/${type.toLowerCase()}.svg`} alt={type} />
                    </div>
                    <h4>{type}</h4>
                  </button>
                ))}
              </div>
              <button type="button" className={`next ${selectedType ? "" : "disabled"}`} onClick={nextStep} disabled={!selectedType}>
                Next
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="step2">
              <h3>What’s the activity details?</h3>
              <div className="formGroup">
                <label htmlFor="activityTitle">Activity Title</label>
                <input type="text" id="activityTitle" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="formGroup">
                <label htmlFor="activityDate">Date</label>
                <input type="date" id="activityDate" name="date" value={formData.date} onChange={handleInputChange} required />
              </div>
              <div className="formGroup">
                <label htmlFor="activityTime">Time</label>
                <input type="time" id="activityTime" name="time" value={formData.time} onChange={handleInputChange} required />
              </div>
              <div className="formGroup">
                <label htmlFor="activityNotes">Notes (optional)</label>
                <textarea id="activityNotes" name="notes" value={formData.notes} onChange={handleInputChange} />
              </div>
              <div className="buttons">
                <button type="button" className="back" onClick={prevStep}>
                  Back
                </button>
                <button type="submit" className={`save ${isStep2Valid ? "" : "disabled"}`} disabled={!isStep2Valid}>
                  Save
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddActivityModal;
