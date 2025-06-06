import { useCallback, useEffect, useMemo, useState } from "react";
import MyActionListener from "../../common/action-listener/ActionListener";
import BoxesComponent from "../../components/boxes-component/BoxesComponent";
import { NUM_OF_BOXES } from "../../components/boxes-component/consts";
import KeyboardComponent from "../../components/keyboard-component/KeyboardComponent";
import { DICTIONARY_URL } from "./consts";
import styles from "./styles.module.css";

const SimplifiedWordle = () => {
	const actionListener = useMemo(() => new MyActionListener(), []);
	const [word, setWord] = useState<string>("");
	const [wordStatus, setWordStatus] = useState<boolean | null>(null);

	const onEnter = useCallback(() => {
		if (word.length != NUM_OF_BOXES) setWordStatus(false);
		else {
			fetch(`${DICTIONARY_URL}/${word}`)
				.then((response) => setWordStatus(response.ok))
				.catch((error) => {
					console.error("Dictionary API error:", error);
					setWordStatus(false);
				});
		}
	}, [word]);

	const onDelete = useCallback(() => {
		if (word.length) setWord((prev) => prev.slice(0, -1));
	}, [word]);

	const onInput = useCallback(
		(key?: string) => {
			setWordStatus(null);
			if (key && ["ENTER", "DELETE"].includes(key)) actionListener.emit(key);
			else if (key && word.length < NUM_OF_BOXES)
				setWord((prev) => prev + key.toUpperCase());
		},
		[word]
	);

	useEffect(() => {
		const actionsMapping: Record<string, (arg?: string) => void> = {
			ENTER: onEnter,
			DELETE: onDelete,
			INPUT: onInput,
		};

		Object.entries(actionsMapping).forEach(([action, listener]) => {
			actionListener.registerListener(action, listener);
		});

		return () => {
			Object.keys(actionsMapping).forEach((action) => {
				actionListener.removeListener(action);
			});
		};
	}, [onEnter, onDelete, onInput, actionListener]);

	return (
		<div className={styles.container}>
			<BoxesComponent word={word} status={wordStatus} />
			<KeyboardComponent
				onClick={(key: string) => actionListener.emit("INPUT", key)}
			/>
		</div>
	);
};

export default SimplifiedWordle;
