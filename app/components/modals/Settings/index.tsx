import { Modal, Radio, Select, Switch } from "antd"
import { useAppStore } from "@/store/app"
import * as Types from "@/types"
import NetworkStats from "@/components/common/NetworkStats"
import { XMarkIcon, SunIcon, MoonIcon, Cog6ToothIcon } from "@heroicons/react/24/outline"

const ModalSettings = () => {
  const {
    modalSettings,
    modalSettingsSet,
    themePrefer,
    changeTheme,
    currency,
    currencySet,
    hideBalances,
    hideBalancesSet,
    explorer,
    explorerSet,
    network,
    networkSet,
  } = useAppStore((state) => state)

  return (
    <Modal
      closeIcon={<XMarkIcon className="size-6" strokeWidth={2.5} />}
      title="App Settings"
      open={modalSettings}
      onCancel={() => modalSettingsSet(false)}
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
                  changeTheme(value)
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
              <Select<Types.App.Currencies> value={currency} onChange={(value) => currencySet(value)} size="large">
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
            <span>Explorer</span>
            <span className="ms-auto">
              <Select<Types.App.Explorer>
                value={explorer}
                popupMatchSelectWidth={false}
                onChange={(value) => explorerSet(value)}
                size="large"
              >
                <Select.Option value="cardanoscan">Cardanoscan</Select.Option>
                <Select.Option value="cexplorer">Cexplorer</Select.Option>
                <Select.Option value="adastat">AdaStat</Select.Option>
              </Select>
            </span>
          </span>
        </div>
        <div className="mb-4">
          <span className="flex items-center">
            <span>Hide Balances</span>
            <span className="ms-auto">
              <Switch checked={hideBalances} onChange={() => hideBalancesSet(!hideBalances)} />
            </span>
          </span>
        </div>
        <div className="shared-line-dashed my-5" />
        <div className="mb-4">
          <span className="flex items-center">
            <span>Cardano Network</span>
            <span className="ms-auto">
              <Select<Types.CW3Types.NetworkName> value={network} onChange={(value) => networkSet(value)} size="large">
                <Select.Option value="mainnet">Mainnet</Select.Option>
                <Select.Option value="preprod">Preprod</Select.Option>
                <Select.Option value="preview">Preview</Select.Option>
              </Select>
            </span>
          </span>
        </div>
        <div className="shared-line-dashed my-5" />
        <div className="mb-1">
          <span className="flex items-center">
            <span>App Info</span>
            <div className="ms-auto text-right font-bold">
              <NetworkStats variant="v2" />
            </div>
          </span>
        </div>
      </div>
    </Modal>
  )
}

export default ModalSettings
