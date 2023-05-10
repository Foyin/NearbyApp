import { ReactNode } from "react";
import { Card } from "@aws-amplify/ui-react";
import styles from "./Panel.module.scss";

interface PanelProps{
    header:ReactNode;
    footer: ReactNode;
    children: ReactNode;
}

// Popup panel
const Panel = ({ header, footer, children }: PanelProps) => {
  return (
    <div className={styles.wrapper}>
      <Card className={styles.card} variation="elevated">
        <div className={styles.header}>{header}</div>
        <div className={styles.content}>{children}</div>
        <div className={styles.footer}>{footer}</div>
      </Card>
    </div>
  );
};

export default Panel;