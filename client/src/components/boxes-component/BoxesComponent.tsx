import type { BoxesComponentProps } from "./types";
import styles from "./styles.module.css";
import { NUM_OF_BOXES } from "./consts";

const BoxesComponent = ({ word, status }: BoxesComponentProps) => {
	const lettersFromWord = word.split("").slice(0, NUM_OF_BOXES);
	const letters = [
		...lettersFromWord,
		...Array(NUM_OF_BOXES - lettersFromWord.length).fill(""),
	];

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
