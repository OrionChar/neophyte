<script lang="ts">
 import * as Empty from "$shadcn/components/ui/empty/index.js";
 import { Button } from "$shadcn/components/ui/button/index.js";
 import Ban from "@lucide/svelte/icons/ban";
 import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
</script>
 
<Empty.Root>
 <Empty.Header>
  <Empty.Media class='bg-destructive' variant="icon">
   <Ban class='text-white' />
  </Empty.Media>
  <Empty.Title>The browser does not support WebGL</Empty.Title>
  <Empty.Description>
   Update this old shit or <Button variant="link" class="text-muted-foreground" size="sm"><a target="_blank" href="https://help.constructiononline.com/en/scheduling-webgl-and-hardware-acceleration">enable WEB GL in settings <ArrowUpRightIcon class="inline" /></a>
   </Button>
  </Empty.Description>
 </Empty.Header>
</Empty.Root>