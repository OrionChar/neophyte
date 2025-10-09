<script lang="ts">
    const {onInput, initialValue, disabled = false, hidden =  false}: {
        onInput: (value: number) => void,
        initialValue: number,
        disabled?: boolean,
        hidden?: boolean
    } = $props()

    let value = $state(initialValue)
    const absoluteMin = 1, absoluteMax = 256, initialMax = 32;
    let minLimit = $state(absoluteMin), maxLimit = $state(initialMax)

    function rerange() {
        const threshold = 0.875;
        const factor = 1.5

        const limitMax = maxLimit * threshold
        const isNearMaxLimit = value >= limitMax

        const limitMin = minLimit * (1 - threshold + 1)
        const isNearMinLimit = value <= limitMin

        if (isNearMaxLimit) {
            minLimit = Math.floor(value / factor)
            maxLimit = Math.min(Math.floor(maxLimit * factor), absoluteMax)
        } else if (isNearMinLimit) {
            minLimit = value > initialMax ? Math.floor(minLimit / factor) : absoluteMin
            maxLimit = Math.max(Math.floor(maxLimit / factor), initialMax)
        }
    }

    function setValue(event: Event): void {
        value = Number.parseInt((event.target as HTMLInputElement).value);
    }
</script>

<label hidden={hidden} class='relative'>
    <input 
        type="range"
        disabled={disabled} 
        min={minLimit} 
        max={maxLimit} 
        value={value} 
        onchange={rerange} 
        oninput={(event) => {
            setValue(event)
            onInput(value)
        }} 
    />
    <span class="absolute bottom-4 left-0">{value}</span>
</label>