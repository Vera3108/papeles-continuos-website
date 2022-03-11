export const state = () => ({
	books: [],
	tags: [],
	selectedBook: null,
	selectedTags: []
})

export const mutations = {
	setBooks(state, books) {
		state.books = books
	},

	setTags(state, tags) {
		state.tags = tags
	},

	setSelectedBook(state, id) {
		state.selectedBook = id
	},

	setSelectedTags(state, tags) {
		state.selectedTags = tags
	},

	removeTag(state, index) {
		state.selectedTags.splice(index, 1)

    if (state.selectedTags.length === 0) {
      return
    }
    
		// select first visible book
		let isCurrentBookInCurrentTags = false
		let book = state.books.find((book) => book.id === state.selectedBook)
		for (let tag of book.split('\n')) {
			if (state.selectedTags.includes(tag)) {
				isCurrentBookInCurrentTags = true
				break
			}
		}

		if (!isCurrentBookInCurrentTags) {
			let filteredBooks = state.books.filter((book) => {
				return book.tags.includes(tag)
			})
			state.selectedBook = filteredBooks[0].id
		}
	},

	addTag(state, tag) {
		state.selectedTags.push(tag)

		// select first visible book
		let isCurrentBookInCurrentTags = false
		let book = state.books.find((book) => book.id === state.selectedBook)
		for (let tag of book.tags.split('\n')) {
			if (state.selectedTags.includes(tag)) {
				isCurrentBookInCurrentTags = true
				break
			}
		}

		if (!isCurrentBookInCurrentTags) {
			let filteredBooks = state.books.filter((book) => {
				return book.tags.split('\n').includes(tag)
			})
			state.selectedBook = filteredBooks[0].id
		}
	}
}
