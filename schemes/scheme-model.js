// scheme-model
const db = require('../data/db-config');

function find(){
    return db('schemes');
}

function findById(id){
    return db('schemes')
    .where({id})
    .first();
}

function findSteps(id){
    return db('steps')
    .join('schemes', 'schemes.id', 'steps.scheme_id')
    .select('steps.id', 'schemes.scheme_name', 'steps.step_number','steps.instructions')
    .where({scheme_id:id})
}

function add(scheme){
    return db('schemes')
    .insert(scheme)
    .then(ids=>{
        return findById(ids[0])
    })
}

function update(changes, id){
    return db('schemes')
    .where({id})
    .update(changes);
    
}

function remove(id){
    return db('schemes')
    .where('id', id)
    .del();
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
}