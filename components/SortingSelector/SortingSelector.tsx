import { Checkbox, Container, Group, Select } from '@mantine/core';
import { IconArrowsSort } from '@tabler/icons';

export type SortingMethod = 'meta.views' | 'meta.size' | 'date';

interface SortingSelectorProps {
  sorting: SortingMethod | null;
  setSorting: (sorting: SortingMethod) => void;
  inverted: boolean;
  setInverted: (inverted: boolean) => void;
}

export function SortingSelector({
  sorting,
  setSorting,
  inverted,
  setInverted,
}: SortingSelectorProps) {
  return (
    <Group mb="xs">
      <Container size="sm" sx={{ flex: 1 }} m={0} p={0}>
        <Select
          mt={20}
          transition="pop-top-left"
          transitionDuration={80}
          transitionTimingFunction="ease"
          value={sorting}
          onChange={setSorting}
          label="Lajitteluperuste"
          placeholder="Valitse yksi"
          icon={<IconArrowsSort size={14} />}
          defaultValue="meta.views"
          data={[
            { value: 'meta.views', label: 'Katselukerrat' },
            { value: 'meta.size', label: 'Koko' },
            { value: 'date', label: 'Päivämäärä' },
          ]}
        />

      </Container>
      <Container size="sm" pr={90} mt={40}>
        <Checkbox
          label="Käänteinen"
          checked={inverted}
          onChange={(event) => setInverted(event.currentTarget.checked)}
        />
      </Container>
    </Group>
  );
}
