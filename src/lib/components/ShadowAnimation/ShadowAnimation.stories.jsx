import { LongText as Button } from "../Button/Button.stories";
import ShadowAnimation from "./ShadowAnimation";

export default {
  title: "ReverserEngineer/VercelButton",
  component: ShadowAnimation,
  args: {
    children: (
      <Button
        style={{
          background: "black",
          width: "calc(100% + 10px)",
          height: "calc(100% + 10px)",
        }}
      />
    ),
  },
  decorators: [
    (story) => (
      <div
        className="container"
        style={{
          height: "100px",
          padding: "20px",
          backgroundColor: "#333",
        }}
      >
        {story()}
      </div>
    ),
  ],
};

const Template = (args) => <ShadowAnimation {...args} />;

export const Default = Template.bind({});

export const Border = Template.bind({});

Border.args = {
  children: (
    <Button
      style={{
        background: "black",
        width: "calc(100% - 10px)",
        height: "calc(100% - 10px)",
      }}
    />
  ),
};
