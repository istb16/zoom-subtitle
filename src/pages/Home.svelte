<script lang="ts">
  import InputText from "../components/atoms/InputText.svelte";
  import Button from "../components/atoms/Button.svelte";

  import { onMount } from "svelte";
  import dayjs from "dayjs";
  import { repositories } from "../repositories/RepositoryFactory";
  import { tokenUrl, subtitleList } from "../stores";
  import { exportCsv } from "../libs/csv";

  let zoomTokenUrl: string = "";
  let zoomPosition: number = -1;

  let sendText: string = "";

  let addKey: string = "";
  let addText: string = "";
  let addKeyInput: HTMLElement;
  let addTextInput: HTMLElement;

  type textListItem = [string, string];
  let textList: textListItem[] = [];

  onMount(async () => {
    zoomTokenUrl = $tokenUrl;
    textList = $subtitleList;
    if (!!zoomTokenUrl) await refreshPosition();
  });

  const refreshPosition = async () => {
    zoomPosition = await repositories.zoomSubtitleRepository.getPosition(
      zoomTokenUrl
    );
    if (zoomPosition >= 0) tokenUrl.set(zoomTokenUrl);
  };
  const sendSubtitle = async (message: string | undefined = undefined) => {
    await repositories.zoomSubtitleRepository.post(
      zoomTokenUrl,
      zoomPosition + 1,
      message || sendText
    );
    zoomPosition++;
  };

  const addList = async () => {
    if (addKey.length == 0 && addText.length == 0) return;
    textList[textList.length] = [addKey, addText];
    if (addKey.length != 0) addKeyInput.focus();
    else addTextInput.focus();
    addKey = "";
    addText = "";

    updateList();
  };
  const sendList = async (idx: number) => {
    const msg = textList[idx];
    await sendSubtitle(msg[1]);
  };
  const removeList = (idx: number) => {
    textList.splice(idx, 1);
    textList = textList;
    updateList();
  };
  const updateList = () => {
    subtitleList.set(textList);
  };
  const saveList = () => {
    const d = new Date();
    exportCsv(textList, `Zoom字幕_${dayjs().format("YYYYMMDD-HHmmss")}.csv`, [
      "Key",
      "Value",
    ]);
  };
  const restoreList = () => {
    alert("TODO");
  };
  const clearList = () => {
    textList = [];
    updateList();
  };
</script>

<InputText bind:value={zoomTokenUrl} />
<Button on:click={refreshPosition} disabled={!zoomTokenUrl}>位置取得</Button>

<InputText bind:value={sendText} />
<Button on:click={() => sendSubtitle()} disabled={!zoomTokenUrl && !sendText}
  >送信</Button
>

<h2>字幕リスト</h2>
<table>
  <thead>
    <th>&nbsp;</th>
    <th>キー</th>
    <th>値</th>
    <th>&nbsp;</th>
  </thead>
  <tbody>
    {#each textList as item, idx}
      <tr>
        <td><Button on:click={() => removeList(idx)}>×</Button></td>
        <td><InputText bind:value={item[0]} on:blur={updateList} /></td>
        <td><InputText bind:value={item[1]} on:blur={updateList} /></td>
        <td><Button on:click={() => sendList(idx)}>送信</Button></td>
      </tr>
    {/each}
    <tr />
  </tbody>
  <tfoot>
    <tr>
      <td>&nbsp;</td>
      <td><InputText bind:input={addKeyInput} bind:value={addKey} /></td>
      <td><InputText bind:input={addTextInput} bind:value={addText} /></td>
      <td><Button on:click={addList}>追加</Button></td>
    </tr>
  </tfoot>
</table>

<Button on:click={saveList}>保存</Button>
<Button on:click={restoreList}>復元</Button>
<Button on:click={clearList}>クリア</Button>
