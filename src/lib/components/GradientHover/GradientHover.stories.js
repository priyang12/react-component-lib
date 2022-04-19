import { Default as Button } from "../Button/Button.stories";
import GradientHover from "./GradientHover";

export default {
  title: "Hover/GradientHover",
  component: GradientHover,
  decorators: [(story) => <div className="container">{story()}</div>],
};

const Template = (args) => <GradientHover {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <Button
      style={{
        background: "transparent",
      }}
    />
  ),
};
