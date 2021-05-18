function skill (name, ...args) {
  const obj = { name: name, synonyms: [] };
  for (const syn of args) {
    obj.synonyms.push(syn);
  }
  return obj;
}

module.exports = skill;
