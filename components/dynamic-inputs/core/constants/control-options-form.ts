import { FormInterface } from "../compact/types";

export const CONTROL_OPTIONS_STATIC_FORM: FormInterface = {
  id: null,
  title: "AJOUT DE D'UNE CONFIGURATION DE D'OPTION DE CHAMPS DE SÉLECTION",
  description:
    "Remplir les champs ci-dessous pour ajouter une nouvelle configuration d'options de champe de selection.",
  controls: [
    {
      id: 1,
      label: "Namespace Model",
      placeholder: "Saisir..",
      type: "text",
      classes: "clr-input",
      required: false,
      disabled: false,
      readonly: false,
      unique: true,
      pattern: null,
      description: "modelNamespaceDescriptionText",
      maxLength: 1024,
      minLength: 1,
      min: null,
      max: null,
      minDate: null,
      maxDate: null,
      selectableValues: null,
      selectableModel: null,
      multiple: false,
      options: null,
      controlGroupKey: null,
      controlName: "model",
      controlIndex: 1,
      columns: null,
      rows: null,
      value: null,
    },
    {
      id: 2,
      label: "Table (BD)",
      placeholder: "Saisir...",
      type: "text",
      classes: "clr-input",
      required: true,
      disabled: false,
      readonly: false,
      unique: true,
      pattern: null,
      description: "tableDescriptionText",
      maxLength: 45,
      minLength: 1,
      min: null,
      max: null,
      minDate: null,
      maxDate: null,
      selectableValues: null,
      selectableModel: null,
      multiple: false,
      options: null,
      controlGroupKey: null,
      controlName: "table",
      controlIndex: 2,
      columns: null,
      rows: null,
      value: null,
    },
    {
      id: 3,
      label: "Champ d'indexation",
      placeholder: "Saisir...",
      type: "text",
      classes: "clr-input",
      required: true,
      disabled: false,
      readonly: false,
      unique: false,
      pattern: null,
      description: "keyfieldDescriptionText",
      maxLength: 45,
      minLength: 1,
      min: null,
      max: null,
      minDate: null,
      maxDate: null,
      selectableValues: null,
      selectableModel: null,
      multiple: false,
      options: null,
      controlGroupKey: null,
      controlName: "keyfield",
      controlIndex: 4,
      columns: null,
      rows: null,
      value: null,
    },
    {
      id: 4,
      label: "Champ libellé",
      placeholder: "Saisir...",
      type: "text",
      classes: "clr-input",
      required: true,
      disabled: false,
      readonly: false,
      unique: false,
      pattern: null,
      description: "valuefieldDescriptionText",
      maxLength: 45,
      minLength: 1,
      min: null,
      max: null,
      minDate: null,
      maxDate: null,
      selectableValues: null,
      selectableModel: null,
      multiple: false,
      options: null,
      controlGroupKey: null,
      controlName: "valuefield",
      controlIndex: 5,
      columns: null,
      rows: null,
      value: null,
    },
    {
      id: 5,
      label: "Champ de regroupement",
      placeholder: "Saisir...",
      type: "text",
      classes: "clr-input",
      required: true,
      disabled: false,
      readonly: false,
      unique: false,
      pattern: null,
      description: "groupfieldDescriptionText",
      maxLength: 45,
      minLength: 1,
      min: null,
      max: null,
      minDate: null,
      maxDate: null,
      selectableValues: null,
      selectableModel: null,
      multiple: false,
      options: null,
      controlGroupKey: null,
      controlName: "groupfield",
      controlIndex: 6,
      columns: null,
      rows: null,
      value: null,
    },
    {
      id: 6,
      label: "Libellé",
      placeholder: "Saisir...",
      type: "text",
      classes: "clr-input",
      required: true,
      disabled: false,
      readonly: false,
      unique: false,
      pattern: null,
      description: "displayLabelDescriptionText",
      maxLength: 190,
      minLength: 1,
      min: null,
      max: null,
      minDate: null,
      maxDate: null,
      selectableValues: null,
      selectableModel: null,
      multiple: false,
      options: null,
      controlGroupKey: null,
      controlName: "display_label",
      controlIndex: 3,
      columns: null,
      rows: null,
      value: null,
    },
  ],
  url: null,
};
