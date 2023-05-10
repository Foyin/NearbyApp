
import { Card } from "@aws-amplify/ui-react";
import styles from "./InfoBox.module.scss";

interface InfoBoxProps{
    header: string;
    children: string;
}

// Information box
const InfoBox = ({header, children}: InfoBoxProps) => {
  return (
    <div className={styles.wrapper}>
      <Card variation="elevated">
        <h2 className={styles.header}>{header}</h2>
        <div className={styles.content}>{children}</div>
      </Card>
    </div>
  );
};

export default InfoBox;