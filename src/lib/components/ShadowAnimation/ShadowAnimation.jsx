import './ShadowAnimation.scss';

const ShadowAnimation = ({ children, AnimationCss }) => {
   return <div className={`neon-bg ${AnimationCss}`}>{children}</div>;
};

export default ShadowAnimation;
