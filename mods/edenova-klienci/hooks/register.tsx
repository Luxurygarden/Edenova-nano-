import type { Register } from 'claude-code'

const PANE = 'edenova-klienci'
const TITLE = 'Edenova — Klienci'
const FORM_URL = 'https://claude.ai/artifact/JbocBi94UpqX8DVvnppuyn'

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'klienci',
      description: 'Otwórz panel Edenova z formularzem Klienci i realizacje',
    })
    void $.ui.open({ id: PANE, title: TITLE })

    return next(e)
  })

  on('command.run', { command: 'klienci' }, async $ => {
    await $.ui.open({ id: PANE, title: TITLE, focus: true })

    return { text: 'Panel Edenova — Klienci otwarty.' }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Link } = $.ui.resolve(e)

    return (
      <Box flexDirection="column" gap={1}>
        <Text bold>Klienci i realizacje</Text>
        <Text>
          <Link href={FORM_URL} label="Otwórz formularz" />
        </Text>
        <Text dimColor>1. Wpisz klienta i kliknij „Zapisz klienta”.</Text>
        <Text dimColor>2. Napisz w czacie „dodałem”.</Text>
        <Text dimColor>3. Claude przygotuje wiadomości na zimę, karty realizacji i posty.</Text>
      </Box>
    )
  })
}
