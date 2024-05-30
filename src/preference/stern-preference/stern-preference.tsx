import { Renderer } from "@k8slens/extensions";
import { observer } from "mobx-react";
import React from "react";
import { sternPreferenceStore } from "./stern-preference-store";

const {
  Component: { SubTitle, Switch, Input, InputValidators, Select },
} = Renderer;

@observer
export class MultiPodLogsSternPreference extends React.Component {
  render() {
    const separatorStyle = {
      minWidth: "40px",
      minHeight: "40px",
    };
    const hintStyle = { marginTop: "8px" };

    const timestampOptions = [
      { value: "no", label: "No Timestamp" },
      {
        value: "default",
        label: 'Default (i.e. "2006-01-02T15:04:05.000000000Z07:00")',
      },
      { value: "short", label: 'Short (i.e. "01-02 15:04:05")' },
    ];

    const builtInTemplateOptions = [
      { value: "default", label: "Default" },
      { value: "raw", label: "Raw" },
      { value: "json", label: "JSON" },
      { value: "extjson", label: "Extended JSON" },
      { value: "ppextjson", label: "Pretty-print Extended JSON" },
    ];

    return (
      <section>
        <SubTitle title="Krew Package Manager" />
        <Switch
          checked={sternPreferenceStore.krew}
          onChange={() => {
            sternPreferenceStore.krew = !sternPreferenceStore.krew;
          }}
        >
          Enable the switch if you installed stern via krew package manager
        </Switch>

        <div style={separatorStyle}></div>

        <SubTitle title="Timestamp and Format" />
        <Select
          themeName="lens"
          options={timestampOptions}
          value={sternPreferenceStore.timestamp}
          onChange={(v) => {
            sternPreferenceStore.timestamp = v.value;
          }}
        />
        <span style={hintStyle}>Timestamp format to use.</span>

        <div style={separatorStyle}></div>

        <SubTitle title="Since" />
        <Input
          theme="round-black"
          type="text"
          placeholder="1s"
          value={sternPreferenceStore.since}
          onChange={(v) => {
            sternPreferenceStore.since = v;
          }}
        />
        <span style={hintStyle}>
          Duration (like 5s, 2m, or 3h) from which the logs will be returned
        </span>

        <div style={separatorStyle}></div>

        <SubTitle title="Max Log Requests" />
        <Input
          theme="round-black"
          type="number"
          validators={InputValidators.isNumber}
          min={1}
          value={sternPreferenceStore.maxLogRequests.toString()}
          onChange={(v) => {
            sternPreferenceStore.maxLogRequests = Number(v);
          }}
        />
        <span style={hintStyle}>
          Maximum number of concurrent logs to request.
        </span>

        <div style={separatorStyle}></div>

        <SubTitle title="Built-in Template" />
        <Select
          themeName="lens"
          options={builtInTemplateOptions}
          value={sternPreferenceStore.builtInTemplate}
          onChange={(v) => {
            sternPreferenceStore.builtInTemplate = v.value;
          }}
        />
        <span style={hintStyle}>Predefined template to use.</span>

        <div style={separatorStyle}></div>

        <SubTitle title="Custom Template" />
        <Input
          theme="round-black"
          type="text"
          placeholder='Example: {{.PodName}} | {{.Message}}{{"\n"}}'
          value={sternPreferenceStore.customTemplate}
          onChange={(v) => {
            sternPreferenceStore.customTemplate = v;
          }}
        />
        <span style={hintStyle}>
          Custom template to use, leave empty to use the built-in template.
        </span>
      </section>
    );
  }
}

export class MultiPodLogsSternPreferenceHint extends React.Component {
  render() {
    return <span></span>;
  }
}
