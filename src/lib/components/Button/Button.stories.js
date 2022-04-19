import Button from "./Button";

export default {
  title: "Atoms/Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Button",
};

export const LongText = (args) => (
  <Button
    {...args}
    label={"long long long long Button"}
    StyleClass="ellipsis"
  />
);
