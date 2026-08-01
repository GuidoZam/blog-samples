import * as React from 'react';
import {
  FluentProvider,
  IdPrefixProvider,
  webLightTheme,
  webDarkTheme,
  Title3,
  Button,
  Card,
  CardHeader,
  makeStyles,
  tokens,
  Input,
  Field
} from '@fluentui/react-components';
import { createCopilotTextContent } from '@microsoft/sp-copilot-component';

import type { IFormSampleProps } from './IFormSampleProps';
import { Dropdown } from '@fluentui/react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalM
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS
  },
  badges: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    flexWrap: 'wrap'
  },
  actions: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    flexWrap: 'wrap',
    flexDirection: 'row-reverse',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalM
  },
  formActions: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalM,
    flexDirection: 'row-reverse',
  }
});

/**
 * Main React UI for the Copilot Component starter template.
 *
 * Demonstrates:
 * - **Theming** — wraps content in `<FluentProvider>` with a theme derived
 *   from the host's `hostContext.theme` (`'light' | 'dark'`).
 * - **Host context** — surfaces the current display mode, theme, and
 *   available display modes as live badges.
 * - **Bridge actions** — four buttons that exercise different bridge methods
 *   to show how a component communicates with the Copilot host.
 * - **Form handling** — displays a user data form with fields populated from parameters.
 */
export default function FormSample(props: IFormSampleProps): React.ReactElement {
  const {
    hostContext,
    bridge, strings,
    username: initialUsername, firstName: initialFirstName,
    lastName: initialLastName, role: initialRole, creationDate: initialCreationDate
  } = props;
  const styles = useStyles();
  
  // Form state - initialized with prop values if provided
  const [username, setUsername] = React.useState<string>(initialUsername || '');
  const [firstName, setFirstName] = React.useState<string>(initialFirstName || '');
  const [lastName, setLastName] = React.useState<string>(initialLastName || '');
  const [role, setRole] = React.useState<string>(initialRole || '');
  const [creationDate, setCreationDate] = React.useState<string>(initialCreationDate || '');

  const theme = hostContext.theme === 'dark' ? webDarkTheme : webLightTheme;

  // Handle form submission
  const handleSubmit = React.useCallback(async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    // Send a message with the form data
    const formData = `Username: ${username}, First Name: ${firstName}, Last Name: ${lastName}, Role: ${role}, Creation Date: ${creationDate}`;
    console.log('Form submitted:', formData);
    await bridge.sendFollowUpMessageAsync([
      createCopilotTextContent(`User data submitted: ${formData}`)
    ]);
  }, [bridge, username, firstName, lastName, role, creationDate]);

  return (
    <IdPrefixProvider value="copilot-component-">
      <FluentProvider theme={theme} targetDocument={props.targetDocument} style={{ minHeight: '100%' }}>
        <div className={styles.root}>
          <Card>
            <CardHeader header={<Title3>{strings.FormTitle}</Title3>} />
            <form className={styles.form} onSubmit={handleSubmit}>
              <Field label={strings.UsernameLabel}>
                <Input
                  value={username}
                  onChange={(_, data) => setUsername(data.value)}
                  placeholder={strings.UsernameLabel}
                />
              </Field>

              <Field label={strings.FirstNameLabel}>
                <Input
                  value={firstName}
                  onChange={(_, data) => setFirstName(data.value)}
                  placeholder={strings.FirstNameLabel}
                />
              </Field>

              <Field label={strings.LastNameLabel}>
                <Input
                  value={lastName}
                  onChange={(_, data) => setLastName(data.value)}
                  placeholder={strings.LastNameLabel}
                />
              </Field>

              <Field label={strings.RoleLabel}>
                <Dropdown
                  selectedKey={role}
                  onChange={(_, option) => setRole(option?.key as "Admin" | "Editor" | "Viewer")}
                  placeholder={strings.RoleLabel}
                  options={[
                    { key: "Admin", text: "Admin" },
                    { key: "Editor", text: "Editor" },
                    { key: "Viewer", text: "Viewer" }
                  ]}
                />
              </Field>

              <Field label={strings.CreationDateLabel}>
                <Input
                  type="date"
                  value={creationDate}
                  onChange={(_, data) => setCreationDate(data.value)}
                  placeholder={strings.CreationDateLabel}
                />
              </Field>

              <div className={styles.formActions}>
                <Button
                  type="submit"
                  appearance="primary"
                  disabled={!username || !firstName || !lastName || !role || !creationDate}>
                  {strings.SubmitButtonLabel}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </FluentProvider>
    </IdPrefixProvider>
  );
}
