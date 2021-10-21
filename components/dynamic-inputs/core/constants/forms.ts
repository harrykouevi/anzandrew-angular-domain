import { FormInterface } from "../compact/types";
import { CONTROL_OPTIONS_STATIC_FORM } from "./control-options-form";

export const STATIC_FORMS = {
  createForm: {
    id: null,
    title: 'Créer un nouveau formulaire',
    description: 'Ajouter un nouveau formulaire à votre système. Les formulaires vous permet de collecter des données saisies depuis les interfaces utiliteurs.',
    children: [],
    formControls: [
      {
        label: 'Intitulé',
        placeholder: 'Intitulé du formulaire',
        type: 'text',
        classes: 'clr-input',
        required: 1,
        disabled: 0,
        readonly: 0,
        unique: 0,
        pattern: null,
        description: null,
        maxLength: 255,
        minLength: 1,
        min: null,
        max: null,
        minDate: null,
        maxDate: null,
        selectableValues: null,
        selectableModel: null,
        multiple: 0,
        options: null,
        controlGroupKey: null,
        controlName: 'title',
        controlIndex: 1,
        columns: null,
        rows: null,
        value: null
      },
      {
        label: 'Description',
        placeholder: 'Description du formulaire',
        type: 'textarea',
        classes: 'clr-textarea',
        // type: 'textarea',
        // classes: 'clr-input',
        required: 0,
        disabled: 0,
        readonly: 0,
        unique: 0,
        pattern: null,
        description: null,
        maxLength: null,
        minLength: null,
        min: null,
        max: null,
        minDate: null,
        maxDate: null,
        selectableValues: null,
        selectableModel: null,
        multiple: 0,
        options: null,
        controlGroupKey: null,
        controlName: 'description',
        controlIndex: 2,
        columns: null,
        rows: null,
        value: null,
      },
      {
        label: 'Context du formulaire',
        placeholder: 'saisir',
        type: 'text',
        classes: 'clr-input',
        required: false,
        disabled: 0,
        readonly: 0,
        unique: 0,
        pattern: null,
        description: null,
        maxLength: 145,
        minLength: 4,
        min: null,
        max: null,
        minDate: null,
        maxDate: null,
        selectableValues: null,
        selectableModel: null,
        multiple: 0,
        options: null,
        controlGroupKey: null,
        controlName: 'appcontext',
        controlIndex: 3,
        columns: null,
        rows: null,
        value: null
      },
      {
        label: 'URL d\'accès',
        placeholder: 'Saisir...',
        type: 'text',
        classes: 'clr-input',
        required: 0,
        disabled: 0,
        readonly: 0,
        unique: 0,
        // pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
        pattern: null,
        description: null,
        maxLength: 255,
        minLength: 0,
        min: null,
        max: null,
        minDate: null,
        maxDate: null,
        selectableValues: null,
        selectableModel: null,
        multiple: 0,
        options: null,
        controlGroupKey: null,
        controlName: 'endpoint_url',
        controlIndex: 4,
        columns: null,
        rows: null,
        value: null,
      }
    ],
    url: null
  },
  createFormControl: {
    id: null,
    title: 'Création d\'un champ de formulaire',
    description: 'Remplir les champs ci-dessous pour ajouter un nouveau champ au formulaire ci-après',
    children: [
      {
        title: '',
        formControls: [
          {
            label: 'Libellé',
            placeholder: 'Intituié du champ',
            type: 'text',
            classes: 'clr-input',
            required: 1,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: null,
            maxLength: 255,
            minLength: 1,
            min: null,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'label',
            controlIndex: 2,
            columns: null,
            rows: null,
            value: null
          },
          {
            label: 'Placeholder',
            placeholder: 'Saisir le texte réservé',
            type: 'text',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: null,
            maxLength: 255,
            minLength: 1,
            min: null,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'placeholder',
            controlIndex: 3,
            columns: null,
            rows: null,
            value: null
          },
          {
            label: 'Type du champ',
            placeholder: 'Sélectionner le type du champ',
            type: 'select',
            classes: 'clr-input',
            required: 1,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: null,
            maxLength: null,
            minLength: null,
            min: null,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: 'date|select|textarea|number|text|phone|password|checkbox|radio|email|hidden|file|html|control_group',
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'type',
            controlIndex: 1,
            columns: null,
            rows: null,
            value: null
          },
          {
            label: 'Description',
            placeholder: 'Description du champ',
            type: 'textarea',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: null,
            maxLength: null,
            minLength: null,
            min: null,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'description',
            controlIndex: 4,
            columns: null,
            rows: null,
            value: null,
          },
          {
            label: 'Longueur texte (Max)',
            placeholder: 'Nbr. maximum de charactères',
            type: 'number',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: null,
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'max_length',
            controlIndex: 5,
            columns: null,
            rows: null,
            value: null,
            requiredIf: 'type:text,email,password,phone'
          },
          {
            label: 'Longueur texte (Min)',
            placeholder: 'Nbr. minimum de charactères',
            type: 'number',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: 'Note: Laissez ce champ vide si la valeur de la longueur minimale du texte est 0.',
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'min_length',
            controlIndex: 6,
            columns: null,
            rows: null,
            value: null,
            requiredIf: 'type:text,email,password,phone'
          },
          {
            label: 'Valeur (Max)',
            placeholder: 'Valeur maximale du champ',
            type: 'number',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: null,
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'max',
            controlIndex: 7,
            columns: null,
            rows: null,
            value: null,
            requiredIf: 'type:number'
          },
          {
            label: 'Valeur (Min)',
            placeholder: 'Valeur minimale du champ',
            type: 'number',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: 'Note: Laissez ce champ vide si la valeur minimale est 0.',
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'min',
            controlIndex: 8,
            columns: null,
            rows: null,
            value: null,
            requiredIf: 'type:number'
          },
          {
            label: 'Date (Max)',
            placeholder: 'Saisir la date maximale',
            type: 'date',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: null,
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'max_date',
            controlIndex: 9,
            columns: null,
            rows: null,
            value: null,
            requiredIf: 'type:date'
          },
          {
            label: 'Date (Min)',
            placeholder: 'Choisir la date minimale',
            type: 'date',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: null,
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'min_date',
            controlIndex: 10,
            columns: null,
            rows: null,
            value: null,
            requiredIf: 'type:date'
          },
          {
            label: 'Source de données',
            placeholder: 'Choisir la source des donné',
            type: 'select',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: null,
            maxLength: null,
            minLength: null,
            min: null,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: '1:Simple selection|2:Associer une entité',
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'data_source',
            controlIndex: 11,
            columns: null,
            rows: null,
            value: null,
            requiredIf: 'type:select,checkbox,radio'
          },
          {
            label: 'Liste des valeurs',
            placeholder: 'Saisir la liste des valeurs',
            type: 'text',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: /(((([\d?\w?]+):((\d?[-'a-zA-ZÀ-ÖØ-öø-ÿ \t\u00C0-\u024F]?)+))([|]?)){2,})|([-'a-zA-ZÀ-ÖØ-öø-ÿ \t 0-9])+([|]){1}([-'a-zA-ZÀ-ÖØ-öø-ÿ \t 0-9])+/,
            description: 'Note: Séparez chaque valeur par | pour nous aider a générer de manière efficiente la liste des valeurs. Si la valeur est différente de l\'option à affichée, veuillez séparer la valeur et l\'option par une :(deux points) Ex:[valeur:description]|[valeur2:description2] ou [valeur1|valeur2|valeur3]',
            maxLength: null,
            minLength: null,
            min: null,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'selectable_values',
            controlIndex: 12,
            columns: null,
            rows: null,
            value: null,
            requiredIf: 'data_source:1'
          },
          {
            label: 'Entité associée',
            placeholder: 'Choisir l\'entité associée à la source',
            type: 'select',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: 'Note: Veuillez choisir l\'entité associée à ce champ.',
            maxLength: null,
            minLength: null,
            min: null,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: 'table:form_control_options|model:Drewlabs\\Packages\\Form\\Models\\FormControlOption|keyfield:table|valuefield:display_label',
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'selectable_model',
            controlIndex: 12,
            columns: null,
            rows: null,
            value: null,
            requiredIf: 'data_source:2'
          },
          // Filters input
          {
            label: 'Paramètres du champ (Filtres)',
            placeholder: 'Saisir...',
            type: 'text',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: 'Ces paramètres permette de filtrer les valeurs chargées depuis la base de données. Seul les opérateurs =,<,>,=<,>=,like sont supportés pour rendre le traitement plus simple. (Syntax: column[[op]]value) <br />Example:column[[=]]value;column[[<]]value;colum3[[like]]value',
            maxLength: 254,
            minLength: null,
            min: null,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'model_filters',
            controlIndex: 13,
            columns: null,
            rows: null,
            value: null,
            requiredIf: 'data_source:2'
          },
          // Filters input
          {
            label: 'Nbr. de lignes',
            placeholder: 'Nombre total de lignes',
            type: 'number',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: null,
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'rows',
            controlIndex: 14,
            columns: null,
            rows: null,
            value: null,
            requiredIf: 'type:textarea'
          },
          {
            label: 'Nbr. de colonnes',
            placeholder: 'Nombre total de colonnes',
            type: 'number',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: null,
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'columns',
            controlIndex: 15,
            columns: null,
            rows: null,
            value: null,
            requiredIf: 'type:textarea'
          },
          {
            label: 'Classe(s) de la feuille de style',
            placeholder: 'Veuillez saisir les class css associées au champ',
            type: 'text',
            classes: 'clr-input',
            required: 1,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: null,
            maxLength: 100,
            minLength: 1,
            min: null,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'classes',
            controlIndex: 16,
            columns: null,
            rows: null,
            value: 'clr-input'
          },
          {
            label: 'URL de soumission',
            placeholder: 'Saisir le lien de soumission du fichier si présent dans un formulaire',
            type: 'text',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
            description: null,
            maxLength: 512,
            minLength: 0,
            min: null,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'upload_url',
            controlIndex: 17,
            columns: null,
            rows: null,
            value: null,
            requiredIf: 'type:file'
          },
          {
            label: 'Multiple ?',
            placeholder: '',
            type: 'radio',
            classes: 'clr-input',
            required: 1,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: 'Le champ support-il une sélection multiple ?',
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: '1:Oui|0:Non',
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'multiple',
            controlIndex: 18,
            columns: null,
            rows: null,
            value: null,
            // requiredIf: 'type:file,select,checkbox'
          }
        ]
      },
      {
        title: 'Configuration du champ du formulaire',
        description: '',
        formControls: [
          {
            label: 'Attribut',
            placeholder: 'Saisir le nom de l\'attribut  name du champ',
            type: 'text',
            classes: 'clr-input',
            required: 1,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: 'Veuillez saisir le nom de l\'attribut [name] du champ. Cet attribut contient la valeur du champ à la soumission.',
            maxLength: 100,
            minLength: 0,
            min: null,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'control_name',
            controlIndex: 1,
            columns: null,
            rows: null,
            value: null,
            requiredIf:  null
          },
          {
            label: 'Index',
            placeholder: 'Index du champ sur le formulaire',
            type: 'number',
            classes: 'clr-input',
            required: 1,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: 'Veuillez spécifier l\'index du champ sur le formulaire généré.',
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'index',
            controlIndex: 2,
            columns: null,
            rows: null,
            value: null
          },
          {
            label: 'Valeur par défaut',
            placeholder: 'Saisir la valeur par défaut associé au champ',
            type: 'text',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: null,
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'value',
            controlIndex: 3,
            columns: null,
            rows: null,
            value: null
          },
          {
            label: 'Requis ?',
            placeholder: '',
            type: 'radio',
            classes: 'clr-input',
            required: 1,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: 'Le champ est-il requis ?',
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: '1:Oui|0:Non',
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'required',
            controlIndex: 4,
            columns: null,
            rows: null,
            value: null
          },
          {
            label: 'Désactivé ?',
            placeholder: '',
            type: 'radio',
            classes: 'clr-input',
            required: 1,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: 'Le champ est-il désactivé par défaut ?',
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: '1:Oui|0:Non',
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'disabled',
            controlIndex: 5,
            columns: null,
            rows: null,
            value: 0
          },
          {
            label: 'Lecture ?',
            placeholder: '',
            type: 'radio',
            classes: 'clr-input',
            required: 1,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: 'Le champ est-il un champ a lecture simple ?',
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: '1:Oui|0:Non',
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'read_only',
            controlIndex: 6,
            columns: null,
            rows: null,
            value: 0
          },
          {
            label: 'Unique ?',
            placeholder: '',
            type: 'radio',
            classes: 'clr-input',
            required: 1,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: 'La valeur du champ devra t-elle être unique ?',
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: '1:Oui|0:Non',
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'unique',
            controlIndex: 7,
            columns: null,
            rows: null,
            value: 0
          },
          {
            label: 'Définir la condition d\'unicité',
            placeholder: 'Définissez la condition d\'unicité',
            type: 'text',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: /(([\d?\w?]+):([\d?\w?]+)){1}/,
            description: 'Note: Veuillez séparer l\'entité ou la table et la colonne par un :(deux points) Ex:[table:colonne]',
            maxLength: 255,
            minLength: null,
            min: null,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'unique_on',
            controlIndex: 8,
            columns: null,
            rows: null,
            value: null,
            requiredIf: 'unique:1'
          },
          {
            label: 'Le champ est-il conditionné ?',
            placeholder: '',
            type: 'radio',
            classes: 'clr-input',
            required: 1,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: 'Si le champ est conditionnée par un autre champ dans ce formulaire, sélectionnez l\'option oui',
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: '1:Oui|0:Non',
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'control_is_conditionned',
            controlIndex: 8,
            columns: null,
            rows: null,
            value: 0
          },
          {
            label: 'Définir la condition du champ',
            placeholder: 'Saisir un expression régulière de validation du champ',
            type: 'text',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: /(\d?[A-za-z_]?)+:(\d?[A-Za-z_]?)+/,
            description: 'Note: Saisir le nom du champ qui conditionne l\'affichage du champ actuel suivi de la valeur de conditionnement séparés de ":" . Exemple: [nom_du_champ:valeur]',
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'required_if',
            controlIndex: 9,
            columns: null,
            rows: null,
            value: null,
            requiredIf: 'control_is_conditionned:1'
          },
          // is_repeatable
          {
            label: 'Le champ est-il répétable ?',
            placeholder: '',
            type: 'radio',
            classes: 'clr-input',
            required: 1,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: 'Choisissez Oui pour créer un champ répétable.',
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: '1:Oui|0:Non',
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'is_repeatable',
            controlIndex: 8,
            columns: null,
            rows: null,
            value: 0
          },
          {
            label: 'Expression régulière de validation ?',
            placeholder: 'Saisir un expression régulière de validation du champ',
            type: 'text',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: '',
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'pattern',
            controlIndex: 10,
            columns: null,
            rows: null,
            value: null,
            requiredIf: 'type:text,email,password,file'
          }, // container_class
          {
            label: 'Classe CSS du conteneur',
            placeholder: 'Saisir la class du conteneur du champ',
            type: 'text',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: null,
            maxLength: null,
            minLength: null,
            min: 0,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'container_class',
            controlIndex: 11,
            columns: null,
            rows: null,
            value: 'clr-col-12',
          },
          {
            label: 'Hidden Control',
            placeholder: 'Hidden Control Placeholder',
            type: 'hidden',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: null,
            maxLength: null,
            minLength: null,
            min: null,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'form_id',
            controlIndex: 12,
            columns: null,
            rows: null,
            value: null,
          },
          {
            label: 'Hidden Control',
            placeholder: 'Hidden Control Placeholder',
            type: 'hidden',
            classes: 'clr-input',
            required: 0,
            disabled: 0,
            readonly: 0,
            unique: 0,
            pattern: null,
            description: null,
            maxLength: null,
            minLength: null,
            min: null,
            max: null,
            minDate: null,
            maxDate: null,
            selectableValues: null,
            selectableModel: null,
            multiple: 0,
            options: null,
            controlGroupKey: null,
            controlName: 'form_control_id',
            controlIndex: 13,
            columns: null,
            rows: null,
            value: null,
          },
        ]
      }
    ],
    formControls: []
  },
  createControlOptions: CONTROL_OPTIONS_STATIC_FORM as FormInterface
};
