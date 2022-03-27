<template>
	<q-page padding>
		<pre>{{ todos }}</pre>

		<q-page-sticky position="bottom-right" :offset="[22, 22]">
			<q-btn :loading="creating" fab color="secondary" icon="add" @click="create({ body: '' })"></q-btn>
		</q-page-sticky>
	</q-page>
</template>

<script setup>
	import Todo from 'models/Todo';
	import { useModelCollection } from '@vuemodel/supabase/src/main';
	import { useModelApi } from '@vuemodel/supabase/src/main';

	const { index, collection: todos } = useModelCollection(Todo);
	const { create, creating } = useModelApi(Todo);

	index();
</script>
