import { Modal, Radio, Select, Switch } from "antd"
import { useShallow } from "zustand/react/shallow"
import { usePreferencesStore } from "@/store/preferences"
import { useUiStore } from "@/store/ui"
import * as Types from "@/types"
import { XMarkIcon, SunIcon, MoonIcon, Cog6ToothIcon } from "@heroicons/react/24/outline"

const ModalSettings = () => {
  const {
    themePrefer,
    setThemePreference,
    currency,
    setCurrency,
    hideBalances,
    setHideBalances,
  } = usePreferencesStore(
    useShallow((state) => ({
      themePrefer: state.themePrefer,
      setThemePreference: state.setThemePreference,
      currency: state.currency,
      setCurrency: state.setCurrency,
      hideBalances: state.hideBalances,
      setHideBalances: state.setHideBalances,
    }))
  )
  const settingsOpen = useUiStore((state) => state.settingsOpen)
  const setSettingsOpen = useUiStore((state) => state.setSettingsOpen)

  return (
    <Modal
      closeIcon={<XMarkIcon className="size-6" strokeWidth={2.5} />}
      title="App Settings"
      open={settingsOpen}
      onCancel={() => setSettingsOpen(false)}
      footer={null}
      width={550}
      destroyOnHidden
    >
      <div>
        <div className="mb-4">
          <span className="flex items-center">
            <span>Color Theme</span>
            <span className="ms-auto text-nowrap">
              <Radio.Group
                value={themePrefer}
                optionType="button"
                buttonStyle="solid"
                size="large"
                onChange={({ target: { value } }) => {
                  setThemePreference(value)
                }}
                options={[
                  {
                    label: (
                      <span className="inline-flex items-center">
                        <SunIcon className="size-5 me-1" strokeWidth={2} />
                        <span>Light</span>
                      </span>
                    ),
                    value: "light",
                  },
                  {
                    label: (
                      <span className="inline-flex items-center">
                        <MoonIcon className="size-5 me-1" strokeWidth={2} />
                        <span>Dark</span>
                      </span>
                    ),
                    value: "dark",
                  },
                  {
                    label: (
                      <span className="inline-flex items-center">
                        <Cog6ToothIcon className="size-5 me-1" strokeWidth={2} />
                        <span>System</span>
                      </span>
                    ),
                    value: "system",
                  },
                ]}
              />
            </span>
          </span>
        </div>
        <div className="mb-4">
          <span className="flex items-center">
            <span>Default Currency</span>
            <span className="ms-auto">
              <Select<Types.App.Currencies> value={currency} onChange={setCurrency} size="large">
                <Select.Option value="usd">$ USD</Select.Option>
                <Select.Option value="eur">€ EUR</Select.Option>
                <Select.Option value="gbp">£ GBP</Select.Option>
                <Select.Option value="jpy">¥ JPY</Select.Option>
                <Select.Option value="cny">¥ CNY</Select.Option>
              </Select>
            </span>
          </span>
        </div>
        <div className="mb-4">
          <span className="flex items-center">
            <span>Hide Balances</span>
            <span className="ms-auto">
              <Switch checked={hideBalances} onChange={setHideBalances} />
            </span>
          </span>
        </div>
      </div>
    </Modal>
  )
}

export default ModalSettings
