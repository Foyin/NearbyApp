import { useState } from "react";
import { Heading, Button, RadioGroupField, Radio } from "@aws-amplify/ui-react";
import Panel from "../../Common/Panel";
import styles from "./RoutesPanel.module.scss";

interface RoutesPanelProps{
  onCalculate: ({}) => {};
  onReset: () => void;
  onClose: () => void;
  departurePosition: string | undefined;
  destinationPosition: string | undefined;
  travelMode: string;
  departureTimeMode: string;
  departureDate: string;
  departureTime: string;
  handleTravelModeChange: (handleTravelModeChange: string) => void;
  handleDepartureTimeModeChange: (handleDepartureTimeModeChange: string) => void;
  handleDepartureDateChange: (handleDepartureDateChange: string) => void;
  handleDepartureTimeChange: (handleDepartureTimeChange: string) => void;
  initialState: {
    travelMode: string,
    departureTimeMode: string,
    departureDate: string,
    departureTime: string,
  };
}

const getDestinationTextColor = (departurePosition: string, destinationPosition: string) => {
  if (!departurePosition && !destinationPosition) {
    return "#cacaca";
  } else if (departurePosition && !destinationPosition) {
    return "#050659";
  } else {
    return "#606060";
  }
};

// Popup panel to calculate route
const RoutesPanel = ({ 
  onCalculate, 
  onReset, 
  onClose, 
  departurePosition, 
  destinationPosition,
  travelMode,
  departureTimeMode,
  departureDate,
  departureTime,
  handleTravelModeChange,
  handleDepartureTimeModeChange,
  handleDepartureDateChange,
  handleDepartureTimeChange,
  initialState
 }: RoutesPanelProps) => {
  
  const [departureDateTimeError, setDepartureDateTimeError] = useState(false);
  const [pastDepartureDateTimeError, setPastDepartureDateTimeError] = useState(false);

  const handleCalculate = () => {
    const departureDateTime =
      departureDate && departureTime ? new Date(departureDate + " " + departureTime) : new Date();

    if (departureTimeMode === "future" && (departureDate === "" || departureTime === "")) {
      // Display error if trying to calculate future route with empty date or time values
      setDepartureDateTimeError(true);

      // #: REVIEW
    } else if (departureTimeMode === "future" && new Date() >= departureDateTime) {
      // Display error if trying to calculate future route with a date time in the past
      setPastDepartureDateTimeError(true);
    } else {
      setDepartureDateTimeError(false);
      setPastDepartureDateTimeError(false);
      onCalculate({
        travelMode,
        departureTimeMode,
        departureDateTime,
      });
    }
  };

  const handleReset = () => {
    setDepartureDateTimeError(false);
    setPastDepartureDateTimeError(false);
    handleTravelModeChange(initialState.travelMode);
    handleDepartureTimeModeChange(initialState.departureTimeMode);
    handleDepartureDateChange(initialState.departureDate);
    handleDepartureTimeChange(initialState.departureTime);
    // Call parent component reset to clear the markers
    onReset();
  };

  return (
    <Panel
      header={
        <>
          <Heading style={{color: "#050659"}}level={4}>Routes</Heading>
          <div>Plot route positions on the map to calculate a route</div>
          <div>Or use search bar to choose departure and destination positions</div>
        </>
      }
      footer={
        <>
          <Button size="small" style={{border: "1px solid #050659"}} onClick={onClose}>
            Close
          </Button>
          <div>
            <Button
              variation="link"
              size="small"
              style={{ marginRight: "0.5rem" , color: "#050659"}}
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button size="small" variation="primary" style={{backgroundColor: "#050659"}} onClick={handleCalculate}>
              Calculate
            </Button>
          </div>
        </>
      }
    >
      <div className={styles.field}>
        <div className={styles.field__label}>Departure Position</div>
        <em
          className={styles.field__coordinates}
          style={{ color: !departurePosition ? "#FF9900" : "#606060" }}
        >
          {departurePosition ? departurePosition : "Click on the map to set the position"}
        </em>
      </div>
      <div className={styles.field}>
        <div className={styles.field__label}>Destination Position</div>
        <em
          className={styles.field__coordinates}
          style={{ color: getDestinationTextColor(departurePosition !== undefined ? departurePosition : "#000000", 
                                                  destinationPosition !== undefined ? destinationPosition : "#000000") }}
        >
          {destinationPosition ? destinationPosition : "Click on the map to set the position"}
        </em>
      </div>
      <RadioGroupField
        label="Travel Mode"
        name="travelMode"
        value={travelMode}
        onChange={(e) => handleTravelModeChange(e.target.value)}
        style={{ marginBottom: "1rem"}}
      >
        <Radio value="Car">Car</Radio>
        <Radio value="Truck">Truck</Radio>
        <Radio value="Walking">Walking</Radio>
      </RadioGroupField>
      <RadioGroupField
        label="Departure Time"
        name="departureTime"
        value={departureTimeMode}
        onChange={(e) => handleDepartureTimeModeChange(e.target.value)}
        style={{ marginBottom: "1rem" }}
      >
        <Radio value="none">None (no traffic)</Radio>
        <Radio value="now">Now (live traffic)</Radio>
        <Radio value="future">Future (predicted traffic)</Radio>
      </RadioGroupField>
      <div className={styles.field}>
        <label htmlFor="departureDate" className={styles.field__label}>
          Date
        </label>
        <input
          id="departureDate"
          type="date"
          className={styles.field__input}
          disabled={departureTimeMode !== "future" ? true : false}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            handleDepartureDateChange(e.target.value);
          }}
          value={departureDate}
        />
        {departureDateTimeError && (
          <div className={styles.error}>A valid date and time are required.</div>
        )}
        <em className={pastDepartureDateTimeError ? styles.error : undefined}>
          Departure date must be in the future.
        </em>
      </div>
      <div className={styles.field}>
        <label htmlFor="departureTime" className={styles.field__label}>
          Time
        </label>
        <input
          id="departureTime"
          type="time"
          className={styles.field__input}
          disabled={departureTimeMode !== "future" ? true : false}
          onChange={(e) => handleDepartureTimeChange(e.target.value)}
          value={departureTime}
        />
        {departureDateTimeError && (
          <div className={styles.error}>A valid date and time are required.</div>
        )}
        <em className={pastDepartureDateTimeError ? styles.error : undefined}>
          Departure time must be in the future.
        </em>
      </div>
    </Panel>
  );
};

export default RoutesPanel;