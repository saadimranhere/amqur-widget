import { WidgetRoot } from './widget/WidgetRoot';
import { WidgetProvider } from './widget/WidgetContext';
import type {
    AmqurWidgetConfig,
    WidgetBootstrapResult,
} from './widget/types';

type Props = {
    config: AmqurWidgetConfig;
    bootstrap: WidgetBootstrapResult;
};

export default function App({ config, bootstrap }: Props) {
    return (
        <WidgetProvider config={config} bootstrap={bootstrap}>
            <WidgetRoot />
        </WidgetProvider>
    );
}
