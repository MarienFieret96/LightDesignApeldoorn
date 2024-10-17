import React from "react";

// const types = {
// 	primary: PrimaryButton,
// 	secondary: SecondaryButton,
// 	tertiary: TertiaryButton,
// };

const Button = ({ type, classnames, text }) => {
	// const currentButton = types[type];
	return (
		<button className={classnames} type="button">
			{/* {text} */}
		</button>
	);
};

export default Button;
