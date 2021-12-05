
exports.up = async function(knex) {
  await knex.schema
  .createTable('organization_invites', organization_invites => {
    organization_invites.increments('organization_invite_id');
    organization_invites.string('message');
    organization_invites.integer('organization_id')
    .unsigned()
    .notNullable()
    .references('organization_id')
    .inTable('organizations')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');
    organization_invites.integer('user_id')
    .unsigned()
    .notNullable()
    .references('user_id')
    .inTable('users')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');
    
    organization_invites.timestamp('created_at').defaultTo(knex.fn.now());
    organization_invites.timestamp('modified_at').defaultTo(knex.fn.now());
  })
  .createTable('organization_invites_sent', organization_invites_sent => {
    organization_invites_sent.increments('organization_invite_sent_id');
    organization_invites_sent.string('status');
    organization_invites_sent.integer('organization_invite_id')
    .unsigned()
    .notNullable()
    .references('organization_invite_id')
    .inTable('organization_invites')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');
    organization_invites_sent.integer('user_id')
    .unsigned()
    .notNullable()
    .references('user_id')
    .inTable('users')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');

    organization_invites_sent.timestamp('created_at').defaultTo(knex.fn.now());
    organization_invites_sent.timestamp('modified_at').defaultTo(knex.fn.now());
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('organization_invites_sent');
  await knex.schema.dropTableIfExists('organization_invites');
};
