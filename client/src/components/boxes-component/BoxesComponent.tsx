import type { BoxesComponentProps } from "./types";
import styles from "./styles.module.css";

const BoxesComponent = ({ letters, status }: BoxesComponentProps) => {
	return (
		<div className={styles.container}>
			{letters.map((letter, letterIdx) => (
				<div
					key={letterIdx}
					className={`${styles.box} ${
						status === null ? "" : status ? styles.valid : styles.invalid
					}`}
				>
					<div className={styles.letter}>{letter}</div>
				</div>
			))}
		</div>
	);
};

export default BoxesComponent;
