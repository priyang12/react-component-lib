import { Default as Button } from "../Button/Button.stories";
import GradientHover from "./GradientHover";

export default {
  title: "GradientHover/Border",
  component: GradientHover,
  args: {
    children: (
      <Button
        style={{
          background: "transparent",
        }}
      />
    ),
    animationTime: "0.2s",
  },
  decorators: [
    (story) => (
      <div
        className="container"
        style={{
          height: "100px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        {story()}
      </div>
    ),
  ],
};

const Template = (args) => <GradientHover {...args} />;

export const Default = Template.bind({});

export const Faster = Template.bind({});

Faster.args = {
  animationTime: "0.1s",
};
