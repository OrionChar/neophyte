<script lang="ts">
    const {onInput, disabled = false, hidden =  false}: {
        onInput: (value: number) => void
        disabled?: boolean,
        hidden?: boolean
    } = $props()

    let value = $state(10)
    let minLimit = $state(1), maxLimit = $state(39)

    function rerange() {
        const threshold = 0.94;
        const limitMax = maxLimit * threshold
        const isNearMaxLimit = value >= limitMax
        const limitMin = minLimit * (1 - threshold + 1)
        const isNearMinLimit = value <= limitMin
        const factor = 1.5

        if (isNearMaxLimit) {
            minLimit = Math.floor(value / factor)
            maxLimit = Math.floor(maxLimit * factor)
        } else if (value > 1 && isNearMinLimit) {
            minLimit = value > 39 ? Math.floor(minLimit / factor) : 1
            maxLimit = Math.max(Math.floor(value / factor), 39)
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