import { Renderer } from "@k8slens/extensions";
import { makeObservable } from "mobx";
import { observer } from "mobx-react";
import React from "react";

const {
  Component: { Checkbox },
} = Renderer;

export class MultiPodLogsPreferenceProps {
  preference: {
    enabled: boolean;
  };
}

@observer
export class MultiPodLogsPreferenceInput extends React.Component<MultiPodLogsPreferenceProps> {
  public constructor() {
    super({ preference: { enabled: false } });
    makeObservable(this);
  }

  render() {
    const { preference } = this.props;
    return (
      <Checkbox
        label="I understand appPreferences"
        value={preference.enabled}
        onChange={(v) => {
          preference.enabled = v;
        }}
      />
    );
  }
}

export class MultiPodLogsPreferenceHint extends React.Component {
  render() {
    return <span>This is an example of an appPreference for extensions.</span>;
  }
}
